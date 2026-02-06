import { useState, useEffect, useCallback } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  link: string | null;
  is_read: boolean;
  created_at: string;
}

const DISMISSED_KEY = "mkucu_dismissed_notifications";

// Get dismissed notification IDs from localStorage
const getDismissedIds = (): Set<string> => {
  try {
    const stored = localStorage.getItem(DISMISSED_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
};

// Save dismissed notification IDs to localStorage
const saveDismissedIds = (ids: Set<string>) => {
  try {
    localStorage.setItem(DISMISSED_KEY, JSON.stringify([...ids]));
  } catch {
    // localStorage not available
  }
};

export const NotificationBell = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const [isOpen, setIsOpen] = useState(false);

  // Load dismissed IDs from localStorage on mount
  useEffect(() => {
    setDismissedIds(getDismissedIds());
  }, []);

  useEffect(() => {
    fetchNotifications();

    // Subscribe to realtime notifications
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          const newNotification = payload.new as Notification;
          setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setNotifications((data as Notification[]) || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Filter out dismissed notifications for display
  const visibleNotifications = notifications.filter(n => !dismissedIds.has(n.id));
  const unreadCount = visibleNotifications.length;

  const dismissNotification = useCallback((id: string) => {
    setDismissedIds(prev => {
      const next = new Set(prev);
      next.add(id);
      saveDismissedIds(next);
      return next;
    });
  }, []);

  const handleNotificationClick = useCallback((notification: Notification, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Dismiss this notification for this device
    dismissNotification(notification.id);
    
    // Navigate without page refresh
    if (notification.link) {
      navigate(notification.link);
    }
    setIsOpen(false);
  }, [dismissNotification, navigate]);

  const dismissAll = useCallback(() => {
    const allIds = new Set(notifications.map(n => n.id));
    setDismissedIds(prev => {
      const next = new Set([...prev, ...allIds]);
      saveDismissedIds(next);
      return next;
    });
  }, [notifications]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'comment': return 'bg-blue-500';
      case 'event': return 'bg-green-500';
      case 'announcement': return 'bg-orange-500';
      default: return 'bg-primary';
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3 border-b border-border">
          <h4 className="font-semibold text-foreground">Notifications</h4>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {visibleNotifications.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground text-sm">
              No new notifications
            </div>
          ) : (
            visibleNotifications.map((notification) => (
              <button
                key={notification.id}
                onClick={(e) => handleNotificationClick(notification, e)}
                className="w-full p-3 text-left hover:bg-muted/50 transition-colors border-b border-border last:border-b-0 bg-primary/5"
              >
                <div className="flex gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getTypeColor(notification.type)}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1 text-foreground">
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
        {visibleNotifications.length > 0 && (
          <div className="p-2 border-t border-border">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-xs"
              onClick={dismissAll}
            >
              Dismiss all
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
