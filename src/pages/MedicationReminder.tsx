import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Pill, Clock, Calendar, Bell } from 'lucide-react';

interface MedicationReminder {
  id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date: string | null;
  reminder_times: string[];
  notes: string | null;
  is_active: boolean;
  created_at: string;
}

const MedicationReminder = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [medications, setMedications] = useState<MedicationReminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    medication_name: '',
    dosage: '',
    frequency: '',
    start_date: '',
    end_date: '',
    reminder_times: '',
    notes: ''
  });

  useEffect(() => {
    if (!user && !loading) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchMedications();
    }
  }, [user]);

  const fetchMedications = async () => {
    try {
      const { data, error } = await supabase
        .from('medication_reminders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedications(data || []);
    } catch (error) {
      console.error('Error fetching medications:', error);
      toast({
        title: "Error",
        description: "Failed to load medication reminders",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const reminderTimesArray = formData.reminder_times
        .split(',')
        .map(time => time.trim())
        .filter(time => time);

      const { error } = await supabase
        .from('medication_reminders')
        .insert({
          user_id: user.id,
          medication_name: formData.medication_name,
          dosage: formData.dosage,
          frequency: formData.frequency,
          start_date: formData.start_date,
          end_date: formData.end_date || null,
          reminder_times: reminderTimesArray,
          notes: formData.notes || null
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Medication reminder added successfully",
      });

      setFormData({
        medication_name: '',
        dosage: '',
        frequency: '',
        start_date: '',
        end_date: '',
        reminder_times: '',
        notes: ''
      });
      setShowForm(false);
      fetchMedications();
    } catch (error) {
      console.error('Error adding medication:', error);
      toast({
        title: "Error",
        description: "Failed to add medication reminder",
        variant: "destructive",
      });
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Medication Reminder
            </h1>
            <p className="text-muted-foreground">
              Manage your medication schedule and never miss a dose
            </p>
          </div>
        </div>

        {/* Add New Medication Button */}
        <div className="mb-6">
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Medication
          </Button>
        </div>

        {/* Add Medication Form */}
        {showForm && (
          <Card className="mb-8 bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5" />
                Add New Medication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="medication_name">Medication Name</Label>
                  <Input
                    id="medication_name"
                    value={formData.medication_name}
                    onChange={(e) => setFormData({ ...formData, medication_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input
                    id="dosage"
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    placeholder="e.g., 10mg"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Input
                    id="frequency"
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    placeholder="e.g., Twice daily"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="reminder_times">Reminder Times</Label>
                  <Input
                    id="reminder_times"
                    value={formData.reminder_times}
                    onChange={(e) => setFormData({ ...formData, reminder_times: e.target.value })}
                    placeholder="e.g., 08:00, 20:00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">End Date (Optional)</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Additional notes about this medication..."
                  />
                </div>
                <div className="md:col-span-2 flex gap-2">
                  <Button type="submit">Add Medication</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Medications List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {medications.length === 0 ? (
            <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-8 text-center">
                <Pill className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No medications added yet</h3>
                <p className="text-muted-foreground mb-4">
                  Add your first medication to start tracking your medicine schedule
                </p>
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Medication
                </Button>
              </CardContent>
            </Card>
          ) : (
            medications.map((medication) => (
              <Card key={medication.id} className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Pill className="h-5 w-5" />
                      {medication.medication_name}
                    </CardTitle>
                    <Badge variant={medication.is_active ? "default" : "secondary"}>
                      {medication.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <CardDescription>{medication.dosage} - {medication.frequency}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(medication.start_date).toLocaleDateString()}
                      {medication.end_date && ` - ${new Date(medication.end_date).toLocaleDateString()}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{medication.reminder_times.join(', ')}</span>
                  </div>
                  {medication.notes && (
                    <p className="text-sm text-muted-foreground">{medication.notes}</p>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Badge variant="outline" className="gap-1">
                      <Bell className="h-3 w-3" />
                      Reminders Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicationReminder;