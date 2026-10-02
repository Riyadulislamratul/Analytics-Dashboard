import {
  User,
  Bell,
  Shield,
  Palette,
} from "lucide-react";

function Settings() {
  const settings = [
    {
      title: "Profile Settings",
      description:
        "Manage your name, email and profile information.",
      icon: User,
    },
    {
      title: "Notifications",
      description:
        "Configure dashboard notification preferences.",
      icon: Bell,
    },
    {
      title: "Security",
      description:
        "Manage password and account security settings.",
      icon: Shield,
    },
    {
      title: "Appearance",
      description:
        "Customize the appearance of your dashboard.",
      icon: Palette,
    },
  ];

  return (
    <main className="flex-1 overflow-hidden bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1200px] animate-fade-up">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-slate-600">
              Settings
            </span>
          </div>

          <h1 className="font-['Manrope'] text-3xl font-extrabold text-slate-900">
            Settings
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your dashboard preferences.
          </p>
        </div>

        <div className="space-y-4">
          {settings.map((setting) => {
            const Icon = setting.icon;

            return (
              <button
                key={setting.title}
                className="flex w-full items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <Icon size={22} />
                </div>

                <div>
                  <h2 className="font-['Manrope'] text-base font-bold text-slate-900">
                    {setting.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {setting.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Settings;