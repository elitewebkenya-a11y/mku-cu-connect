import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Vote, Users, Calendar, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

interface Election {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

interface Candidate {
  id: string;
  election_id: string;
  name: string;
  position: string;
  manifesto: string | null;
  image_url: string | null;
  votes_count: number;
}

const Elections = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [voterId, setVoterId] = useState("");
  const [hasVoted, setHasVoted] = useState<Record<string, boolean>>({});
  const [isVoting, setIsVoting] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      const { data: electionsData, error: electionsError } = await supabase
        .from("elections")
        .select("*")
        .order("start_date", { ascending: false });

      if (electionsError) throw electionsError;

      const { data: candidatesData, error: candidatesError } = await supabase
        .from("election_candidates")
        .select("*")
        .eq("is_active", true)
        .order("position", { ascending: true });

      if (candidatesError) throw candidatesError;

      setElections((electionsData as Election[]) || []);
      setCandidates((candidatesData as Candidate[]) || []);
    } catch (error) {
      console.error("Error fetching elections:", error);
      toast.error("Failed to load elections");
    } finally {
      setLoading(false);
    }
  };

  const checkIfVoted = async (electionId: string) => {
    if (!voterId.trim()) return false;

    const { data } = await supabase
      .from("election_votes")
      .select("id")
      .eq("election_id", electionId)
      .eq("voter_identifier", voterId.trim().toLowerCase())
      .maybeSingle();

    return !!data;
  };

  const handleVote = async (candidateId: string, electionId: string) => {
    if (!voterId.trim()) {
      toast.error("Please enter your student email or phone number");
      return;
    }

    setIsVoting(true);
    try {
      // Check if already voted
      const voted = await checkIfVoted(electionId);
      if (voted) {
        setHasVoted(prev => ({ ...prev, [electionId]: true }));
        toast.error("You have already voted in this election");
        return;
      }

      // Record the vote
      const { error: voteError } = await supabase
        .from("election_votes")
        .insert({
          election_id: electionId,
          candidate_id: candidateId,
          voter_identifier: voterId.trim().toLowerCase(),
        });

      if (voteError) {
        if (voteError.code === "23505") {
          toast.error("You have already voted in this election");
          setHasVoted(prev => ({ ...prev, [electionId]: true }));
        } else {
          throw voteError;
        }
        return;
      }

      // Update vote count
      const candidate = candidates.find(c => c.id === candidateId);
      if (candidate) {
        await supabase
          .from("election_candidates")
          .update({ votes_count: candidate.votes_count + 1 })
          .eq("id", candidateId);
      }

      toast.success("Vote cast successfully! Thank you for participating.", { duration: 4000 });
      setHasVoted(prev => ({ ...prev, [electionId]: true }));
      setSelectedCandidate(null);
      fetchElections(); // Refresh to show updated counts
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("Failed to cast vote. Please try again.");
    } finally {
      setIsVoting(false);
    }
  };

  const getElectionStatus = (election: Election) => {
    const now = new Date();
    const start = new Date(election.start_date);
    const end = new Date(election.end_date);

    if (now < start) return { label: "Upcoming", color: "bg-blue-500" };
    if (now > end) return { label: "Ended", color: "bg-muted-foreground" };
    if (election.is_active) return { label: "Active", color: "bg-green-500" };
    return { label: "Closed", color: "bg-muted-foreground" };
  };

  const getCandidatesForElection = (electionId: string) => 
    candidates.filter(c => c.election_id === electionId);

  const getPositions = (electionId: string) => {
    const electionCandidates = getCandidatesForElection(electionId);
    return [...new Set(electionCandidates.map(c => c.position))];
  };

  const getTotalVotes = (electionId: string) => {
    return getCandidatesForElection(electionId).reduce((sum, c) => sum + c.votes_count, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Vote className="w-5 h-5" />
            <span className="font-semibold">CU Elections</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-foreground">
            MKUCU Elections
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Exercise your right to vote and choose leaders who will guide our Christian Union
          </p>
        </div>

        {/* Voter ID Input */}
        <Card className="max-w-md mx-auto mb-10">
          <CardContent className="p-6">
            <label className="block text-sm font-medium mb-2 text-foreground">
              Your Student Email or Phone Number
            </label>
            <Input
              placeholder="e.g., student@mku.ac.ke or 0712345678"
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
              className="mb-2"
            />
            <p className="text-xs text-muted-foreground">
              Used to verify you vote only once per election (kept private)
            </p>
          </CardContent>
        </Card>

        {elections.length === 0 ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="py-12 text-center">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-bold mb-2 text-foreground">No Elections Available</h3>
              <p className="text-muted-foreground">
                Check back later for upcoming elections
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {elections.map((election) => {
              const status = getElectionStatus(election);
              const positions = getPositions(election.id);
              const totalVotes = getTotalVotes(election.id);
              const isActive = status.label === "Active";
              const hasEnded = status.label === "Ended";
              const voterHasVoted = hasVoted[election.id];

              return (
                <Card key={election.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl md:text-2xl mb-2">{election.title}</CardTitle>
                        {election.description && (
                          <p className="text-primary-foreground/80 text-sm">{election.description}</p>
                        )}
                      </div>
                      <Badge className={`${status.color} text-white`}>{status.label}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-primary-foreground/80">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(election.start_date), "MMM d")} - {format(new Date(election.end_date), "MMM d, yyyy")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {totalVotes} votes cast
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {voterHasVoted && (
                      <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-800 dark:text-green-200 font-medium">
                          You have voted in this election
                        </span>
                      </div>
                    )}

                    {positions.map((position) => {
                      const positionCandidates = getCandidatesForElection(election.id)
                        .filter(c => c.position === position);
                      const maxVotes = Math.max(...positionCandidates.map(c => c.votes_count), 1);

                      return (
                        <div key={position} className="mb-8 last:mb-0">
                          <h3 className="text-lg font-bold mb-4 text-foreground border-b pb-2">
                            {position}
                          </h3>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {positionCandidates.map((candidate) => (
                              <Card 
                                key={candidate.id}
                                className={`p-4 transition-all cursor-pointer hover:shadow-md ${
                                  selectedCandidate === candidate.id 
                                    ? "ring-2 ring-primary" 
                                    : ""
                                }`}
                                onClick={() => isActive && !voterHasVoted && setSelectedCandidate(candidate.id)}
                              >
                                <div className="flex items-start gap-3 mb-3">
                                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {candidate.image_url ? (
                                      <img 
                                        src={candidate.image_url} 
                                        alt={candidate.name}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <Users className="w-6 h-6 text-primary" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-foreground">{candidate.name}</h4>
                                    {hasEnded && (
                                      <span className="text-sm text-muted-foreground">
                                        {candidate.votes_count} votes
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {candidate.manifesto && (
                                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                                    {candidate.manifesto}
                                  </p>
                                )}

                                {hasEnded && totalVotes > 0 && (
                                  <div className="mt-3">
                                    <div className="flex justify-between text-xs mb-1">
                                      <span className="text-muted-foreground">Results</span>
                                      <span className="font-medium">
                                        {Math.round((candidate.votes_count / totalVotes) * 100)}%
                                      </span>
                                    </div>
                                    <Progress 
                                      value={(candidate.votes_count / maxVotes) * 100} 
                                      className="h-2"
                                    />
                                  </div>
                                )}

                                {isActive && !voterHasVoted && selectedCandidate === candidate.id && (
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleVote(candidate.id, election.id);
                                    }}
                                    disabled={isVoting || !voterId.trim()}
                                    className="w-full mt-3"
                                    size="sm"
                                  >
                                    {isVoting ? (
                                      <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Voting...
                                      </>
                                    ) : (
                                      <>
                                        <Vote className="w-4 h-4 mr-2" />
                                        Cast Vote
                                      </>
                                    )}
                                  </Button>
                                )}
                              </Card>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Elections;
