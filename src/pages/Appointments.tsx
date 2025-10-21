import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';

interface Appointment {
  id: string;
  title: string;
  appointment_date: string;
  appointment_time: string;
  location: string;
  notes: string;
  is_completed: boolean;
}

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await api.getAppointments();
        setAppointments(data);
      } catch (error: any) {
        toast({
          title: 'Error loading appointments',
          description: error.message,
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [toast]);

  const getAppointmentStatus = (date: string) => {
    const appointmentDate = new Date(date);
    if (isToday(appointmentDate)) return { label: 'Today', color: 'bg-success text-white' };
    if (isPast(appointmentDate)) return { label: 'Past', color: 'bg-muted text-muted-foreground' };
    return { label: 'Upcoming', color: 'bg-info text-white' };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading appointments...</div>
      </div>
    );
  }

  const upcomingAppointments = appointments.filter(a => !isPast(new Date(a.appointment_date)));
  const pastAppointments = appointments.filter(a => isPast(new Date(a.appointment_date)));

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-primary">Appointments</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-primary mb-3">Upcoming Appointments</h2>
          {upcomingAppointments.length === 0 ? (
            <Card className="p-6 text-center text-muted-foreground">
              No upcoming appointments
            </Card>
          ) : (
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => {
                const status = getAppointmentStatus(appointment.appointment_date);
                return (
                  <Card key={appointment.id} className="p-4 border-2">
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-accent rounded-full">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-primary">{appointment.title}</h3>
                          <Badge className={status.color}>{status.label}</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            <span>{format(new Date(appointment.appointment_date), 'PPPP')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            <span>{appointment.appointment_time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                        {appointment.notes && (
                          <p className="mt-2 text-sm text-foreground">{appointment.notes}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {pastAppointments.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">Past Appointments</h2>
            <div className="space-y-3">
              {pastAppointments.map((appointment) => (
                <Card key={appointment.id} className="p-4 opacity-60">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-muted rounded-full">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{appointment.title}</h3>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(appointment.appointment_date), 'PP')} at {appointment.appointment_time}
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

export default Appointments;
