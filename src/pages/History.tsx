import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Heart, Thermometer, Activity, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Vital {
  id: string;
  blood_pressure_systolic: number;
  blood_pressure_diastolic: number;
  heart_rate: number;
  temperature: number;
  oxygen_saturation: number;
  weight: number;
  recorded_at: string;
}

interface Symptom {
  id: string;
  symptom_name: string;
  severity: string;
  description: string;
  recorded_at: string;
}

const History = () => {
  const [vitals, setVitals] = useState<Vital[]>([]);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vitalsData, symptomsData] = await Promise.all([
          api.getVitals(),
          api.getSymptoms()
        ]);
        setVitals(vitalsData);
        setSymptoms(symptomsData);
      } catch (error: any) {
        toast({
          title: 'Error loading history',
          description: error.message,
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild': return 'bg-yellow-100 text-yellow-800';
      case 'moderate': return 'bg-orange-100 text-orange-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading history...</div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-primary">Health History</h1>

      <Tabs defaultValue="vitals" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
        </TabsList>

        <TabsContent value="vitals" className="space-y-4 mt-4">
          {vitals.length === 0 ? (
            <Card className="p-6 text-center text-muted-foreground">
              No vital signs recorded yet
            </Card>
          ) : (
            vitals.map((vital) => (
              <Card key={vital.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-primary">
                    {format(new Date(vital.recorded_at), 'PPp')}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm">
                      <span className="font-semibold">HR:</span> {vital.heart_rate} bpm
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">
                      <span className="font-semibold">Temp:</span> {vital.temperature}°C
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">
                      <span className="font-semibold">BP:</span> {vital.blood_pressure_systolic}/{vital.blood_pressure_diastolic}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-green-500" />
                    <span className="text-sm">
                      <span className="font-semibold">O2:</span> {vital.oxygen_saturation}%
                    </span>
                  </div>
                  {vital.weight && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        <span className="font-semibold">Weight:</span> {vital.weight} kg
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="symptoms" className="space-y-4 mt-4">
          {symptoms.length === 0 ? (
            <Card className="p-6 text-center text-muted-foreground">
              No symptoms recorded yet
            </Card>
          ) : (
            symptoms.map((symptom) => (
              <Card key={symptom.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-accent rounded-full">
                    <AlertCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-primary">{symptom.symptom_name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(symptom.severity)}`}>
                        {symptom.severity}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{symptom.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(symptom.recorded_at), 'PPp')}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default History;
