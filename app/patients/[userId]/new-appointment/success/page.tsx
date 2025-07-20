"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";

interface Appointment {
  $id: string;
  patient: any;
  schedule: Date;
  status: string;
  primaryPhysician: string;
  reason: string;
  note?: string;
  userId: string;
  cancellationReason?: string;
}

const RequestSuccess = () => {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const params = useParams();
  
  const appointmentId = searchParams.get("appointmentId") || "";
  const userId = params.userId as string;

  useEffect(() => {
    const getAppointment = () => {
      try {
        if (typeof window !== 'undefined' && appointmentId) {
          const stored = localStorage.getItem(`queuecare-appointment-${appointmentId}`);
          if (stored) {
            const appointmentData = JSON.parse(stored);
            console.log('Debug appointment data:', appointmentData);
            
            // Convert ISO string back to Date object
            const appointment = {
              ...appointmentData,
              schedule: new Date(appointmentData.schedule)
            };
            setAppointment(appointment);
          }
        }
      } catch (error) {
        console.error('Error getting appointment:', error);
      } finally {
        setLoading(false);
      }
    };

    getAppointment();
  }, [appointmentId]);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment?.primaryPhysician
  );

  console.log('Debug doctor found:', doctor);
  console.log('Debug primaryPhysician:', appointment?.primaryPhysician);

  // Safe date formatting function
  const formatAppointmentDate = (schedule: any) => {
    try {
      if (!schedule) return 'Date pending confirmation';
      
      const date = new Date(schedule);
      if (isNaN(date.getTime())) return 'Date pending confirmation';
      
      return date.toLocaleDateString('en-ZA', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    } catch (error) {
      return 'Date pending confirmation';
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen max-h-screen px-[5%]">
        <div className="success-img">
          <div className="mb-12 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sa-green">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">QueueCare</h1>
              <p className="text-sm text-gray-600">Queue Success</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="spinner-sa mb-6"></div>
            <p>Loading appointment details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        {/* QueueCare Success Header */}
        <div className="mb-12 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sa-green">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">QueueCare</h1>
            <p className="text-sm text-gray-600">Queue Success</p>
          </div>
        </div>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
            unoptimized
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            You've joined the queue! 🎉
          </h2>
          <p className="text-dark-700">
            Your appointment request has been submitted. You'll receive an SMS confirmation shortly.
          </p>
        </section>

        <section className="request-details">
          <p>Requested appointment details:</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image || "/assets/images/dr-green.png"}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">
              Dr. {appointment?.primaryPhysician || 'Available Doctor'}
            </p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p>{formatAppointmentDate(appointment?.schedule)}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">© 2025 QueueCare</p>
      </div>
    </div>
  );
};

export default RequestSuccess;