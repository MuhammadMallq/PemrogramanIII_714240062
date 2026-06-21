import { getToken, getUser } from "../services/auth";
import Swal from "sweetalert2";
import Button from "../components/atoms/Button";

export default function ProfilPage() {
  const user = getUser();
  const token = getToken();

  const handleShowToken = () => {
    Swal.fire({
      title: "Token JWT",
      text: token || "Token tidak ditemukan",
      icon: "info",
      confirmButtonText: "Tutup",
      confirmButtonColor: "#3b82f6",
      width: 600,
      customClass: {
        popup: "rounded-xl",
      },
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Profil</h2>
          <p className="text-sm text-slate-500">
            Informasi akun yang sedang login.
          </p>
        </div>
        <Button type="button" variant="secondary" onClick={handleShowToken}>
          Lihat Token
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Username
          </p>
          <p className="mt-1 text-lg font-bold text-slate-800">
            {user?.username ?? "-"}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Role
          </p>
          <p className="mt-1 text-lg font-bold text-slate-800">
            {user?.role ?? "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
