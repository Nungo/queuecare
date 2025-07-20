import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  try {
    const user = await getUser(userId);
    const patient = await getPatient(userId);

    // If patient already exists, redirect to appointment booking
    if (patient) redirect(`/patients/${userId}/new-appointment`);

    // If no user found, create a mock user for demo
    const currentUser = user || {
      $id: userId,
      name: "Demo User",
      email: "demo@queuecare.co.za",
      phone: "+27821234567"
    };

    return (
      <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container">
          <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
            {/* QueueCare Header */}
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
                <p className="text-sm text-gray-600">Patient Registration</p>
              </div>
            </div>

            <RegisterForm user={currentUser} />

            <p className="copyright py-12">© 2025 QueueCare</p>
          </div>
        </section>

        <Image
          src="/assets/images/register-img.png"
          height={1000}
          width={1000}
          alt="patient"
          className="side-img max-w-[390px]"
        />
      </div>
    );
  } catch (error) {
    console.error("Registration page error:", error);
    
    // Fallback: create demo user if everything fails
    const demoUser = {
      $id: userId,
      name: "Demo User",
      email: "demo@queuecare.co.za",
      phone: "+27821234567"
    };

    return (
      <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container">
          <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
            <div className="mb-12 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sa-green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">QueueCare</h1>
                <p className="text-sm text-gray-600">Patient Registration</p>
              </div>
            </div>

            <RegisterForm user={demoUser} />
            <p className="copyright py-12">© 2025 QueueCare</p>
          </div>
        </section>

        <Image
          src="/assets/images/register-img.png"
          height={1000}
          width={1000}
          alt="patient"
          className="side-img max-w-[390px]"
        />
      </div>
    );
  }
};

export default Register;