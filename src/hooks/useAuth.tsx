import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

interface AdminDepartment {
  department: string;
  is_approved: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: { full_name: string; email: string } | null;
  isAdmin: boolean;
  departments: AdminDepartment[];
  loading: boolean;
  signOut: () => Promise<void>;
  hasDepartmentAccess: (department: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAdmin: false,
  departments: [],
  loading: true,
  signOut: async () => {},
  hasDepartmentAccess: () => false,
});

export const useAuth = () => useContext(AuthContext);

// Map admin menu IDs to department names
const DEPARTMENT_MAP: Record<string, string[]> = {
  settings: ["super_admin"],
  seo: ["super_admin"],
  hero: ["super_admin", "multimedia"],
  notifications: ["super_admin"],
  schedule: ["super_admin"],
  activities: ["super_admin"],
  events: ["super_admin", "events"],
  gallery: ["super_admin", "multimedia"],
  announcements: ["super_admin"],
  sermons: ["super_admin", "multimedia"],
  blog: ["super_admin", "blog"],
  comments: ["super_admin", "blog"],
  prayers: ["super_admin", "intercessory"],
  leaders: ["super_admin"],
  ministries: ["super_admin"],
  fellowships: ["super_admin", "fellowships"],
  homefellowships: ["super_admin", "fellowships"],
  volunteers: ["super_admin", "care"],
  faqs: ["super_admin"],
  elections: ["super_admin"],
  guests: ["super_admin"],
  choir: ["super_admin", "choir"],
  praise: ["super_admin", "praise_worship"],
  sound: ["super_admin", "sound"],
  ushering: ["super_admin", "ushering"],
};

export const AVAILABLE_DEPARTMENTS = [
  { value: "super_admin", label: "Super Admin (Full Access)" },
  { value: "multimedia", label: "Multimedia" },
  { value: "events", label: "Events" },
  { value: "blog", label: "Blog & Content" },
  { value: "intercessory", label: "Intercessory / Prayer" },
  { value: "fellowships", label: "Fellowships" },
  { value: "care", label: "Care & Volunteers" },
  { value: "choir", label: "Choir" },
  { value: "praise_worship", label: "Praise & Worship" },
  { value: "sound", label: "Sound" },
  { value: "ushering", label: "Ushering" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{ full_name: string; email: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [departments, setDepartments] = useState<AdminDepartment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        // Fetch profile
        const { data: profileData } = await supabase
          .from("profiles")
          .select("full_name, email")
          .eq("id", currentUser.id)
          .maybeSingle();
        setProfile(profileData);

        // Check admin role
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", currentUser.id);
        const hasAdmin = (roleData || []).some((r: any) => r.role === "admin");
        setIsAdmin(hasAdmin);

        // Fetch departments
        const { data: deptData } = await (supabase as any)
          .from("admin_departments")
          .select("department, is_approved")
          .eq("user_id", currentUser.id);
        setDepartments(deptData || []);
      } else {
        setProfile(null);
        setIsAdmin(false);
        setDepartments([]);
      }
      setLoading(false);
    });

    supabase.auth.getSession();

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setIsAdmin(false);
    setDepartments([]);
  };

  const hasDepartmentAccess = (menuId: string): boolean => {
    if (isAdmin) return true; // Full admin has access to everything
    const allowedDepts = DEPARTMENT_MAP[menuId] || ["super_admin"];
    return departments.some(d => d.is_approved && allowedDepts.includes(d.department));
  };

  return (
    <AuthContext.Provider value={{ user, profile, isAdmin, departments, loading, signOut, hasDepartmentAccess }}>
      {children}
    </AuthContext.Provider>
  );
};
