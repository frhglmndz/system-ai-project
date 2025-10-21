import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Pill, Clock, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
}

const Medications = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const data = await api.getMedications();
      setMedications(data);
    } catch (error: any) {
      toast({
        title: 'Error loading medications',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkComplete = async (id: string) => {
    try {
      await api.completeMedication(id);
      toast({ title: 'Medication marked as completed' });
      fetchMedications();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading medications...</div>
      </div>
    );
  }

  const activeMedications = medications.filter(m => m.is_active);
  const completedMedications = medications.filter(m => !m.is_active);

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Medications</h1>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-primary mb-3">Active Medications</h2>
          {activeMedications.length === 0 ? (
            <Card className="p-6 text-center text-muted-foreground">
              No active medications
            </Card>
          ) : (
            <div className="space-y-3">
              {activeMedications.map((med) => (
                <Card key={med.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-accent rounded-full">
                      <Pill className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-primary">{med.name}</h3>
                          <p className="text-sm text-muted-foreground">{med.dosage}</p>
                        </div>
                        <Badge className="bg-success text-white">Active</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{med.frequency}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{format(new Date(med.start_date), 'PP')} - {format(new Date(med.end_date), 'PP')}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleMarkComplete(med.id)}
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      >
                        Mark as Completed
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {completedMedications.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">Completed Medications</h2>
            <div className="space-y-3">
              {completedMedications.map((med) => (
                <Card key={med.id} className="p-4 opacity-60">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-muted rounded-full">
                      <Pill className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-foreground">{med.name}</h3>
                          <p className="text-sm text-muted-foreground">{med.dosage} • {med.frequency}</p>
                        </div>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Medications;
