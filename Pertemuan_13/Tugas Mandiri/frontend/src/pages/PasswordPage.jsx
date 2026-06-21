import { useState } from "react";
import Swal from "sweetalert2";
import Button from "../components/atoms/Button";
import TextInput from "../components/atoms/TextInput";
import FormField from "../components/molecules/FormField";
import { changePassword } from "../services/api";

export default function PasswordPage() {
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.new_password !== form.confirm_password) {
      await Swal.fire({
        title: "Gagal",
        text: "Konfirmasi password baru tidak cocok.",
        icon: "error",
        confirmButtonText: "Tutup",
      });
      return;
    }

    if (form.new_password.length < 4) {
      await Swal.fire({
        title: "Gagal",
        text: "Password baru minimal 4 karakter.",
        icon: "error",
        confirmButtonText: "Tutup",
      });
      return;
    }

    try {
      setLoading(true);
      await changePassword({
        old_password: form.old_password,
        new_password: form.new_password,
      });

      await Swal.fire({
        title: "Berhasil",
        text: "Password berhasil diubah.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setForm({ old_password: "", new_password: "", confirm_password: "" });
    } catch (error) {
      await Swal.fire({
        title: "Gagal",
        text:
          error.response?.data?.message ||
          error.message ||
          "Gagal mengubah password.",
        icon: "error",
        confirmButtonText: "Tutup",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Ubah Password</h2>
        <p className="text-sm text-slate-500">
          Gunakan password lama untuk membuat password baru.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <FormField label="Password Lama" htmlFor="old_password">
          <TextInput
            id="old_password"
            name="old_password"
            type="password"
            value={form.old_password}
            onChange={handleChange}
            placeholder="Masukkan password lama"
            autoComplete="current-password"
            required
          />
        </FormField>

        <FormField label="Password Baru" htmlFor="new_password">
          <TextInput
            id="new_password"
            name="new_password"
            type="password"
            value={form.new_password}
            onChange={handleChange}
            placeholder="Masukkan password baru"
            autoComplete="new-password"
            required
          />
        </FormField>

        <FormField label="Konfirmasi Password Baru" htmlFor="confirm_password">
          <TextInput
            id="confirm_password"
            name="confirm_password"
            type="password"
            value={form.confirm_password}
            onChange={handleChange}
            placeholder="Ulangi password baru"
            autoComplete="new-password"
            required
          />
        </FormField>

        <Button type="submit" disabled={loading}>
          {loading ? "Memproses..." : "Ubah Password"}
        </Button>
      </form>
    </div>
  );
}
