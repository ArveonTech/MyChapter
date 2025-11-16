import { Card, CardHeader, CardContent } from "@/components/ui/card";

const NotesCardComponent = () => {
  return (
    <div className="w-8/12 sm:w-10/12 mx-auto mt-10">
      <div className="grid justify-items-center justify-center gap-4 md:gap-7 lg:gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <Card className="bg-[#caf0f5] p-4 my-auto rounded-3xl shadow-md w-full lg:max-w-60">
          <CardHeader className="p-0">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold line-clamp-1">Note A</h1>
              <p className="text-sm font-medium text-textprimary/70 line-clamp-1">2025-03-12</p>
            </div>
            <div className="w-full h-0.5 bg-textprimary text-textprimary mt-3"></div>
          </CardHeader>

          <CardContent className="p-0 text-textprimary/80 leading-relaxed line-clamp-4">Catatan pertama berisi ringkasan singkat tentang progres harian dan checklist kecil yang harus diselesaikan.</CardContent>
        </Card>

        <Card className="bg-[#caf0f5] p-4 my-auto rounded-3xl shadow-md w-full lg:max-w-60">
          <CardHeader className="p-0">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold line-clamp-1">Note B</h1>
              <p className="text-sm font-medium text-textprimary/70 line-clamp-1">2025-01-28</p>
            </div>
            <div className="w-full h-0.5 bg-textprimary text-textprimary mt-3"></div>
          </CardHeader>

          <CardContent className="p-0 text-textprimary/80 leading-relaxed line-clamp-4">Ini tentang ide fitur baru yang muncul mendadak, termasuk beberapa poin penting untuk update berikutnya.</CardContent>
        </Card>

        <Card className="bg-[#caf0f5] p-4 my-auto rounded-3xl shadow-md w-full lg:max-w-60">
          <CardHeader className="p-0">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold line-clamp-1">Note C</h1>
              <p className="text-sm font-medium text-textprimary/70 line-clamp-1">2025-05-02</p>
            </div>
            <div className="w-full h-0.5 bg-textprimary text-textprimary mt-3"></div>
          </CardHeader>

          <CardContent className="p-0 text-textprimary/80 leading-relaxed line-clamp-4">Sebuah draft konsep untuk halaman UI, termasuk flow dasar dan vibe warna yang mungkin dipakai.</CardContent>
        </Card>

        <Card className="bg-[#caf0f5] p-4 my-auto rounded-3xl shadow-md w-full lg:max-w-60">
          <CardHeader className="p-0">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold line-clamp-1">Note D</h1>
              <p className="text-sm font-medium text-textprimary/70 line-clamp-1">2025-02-17</p>
            </div>
            <div className="w-full h-0.5 bg-textprimary text-textprimary mt-3"></div>
          </CardHeader>

          <CardContent className="p-0 text-textprimary/80 leading-relaxed line-clamp-4">Reminder kecil mengenai bug yang sempat muncul waktu testing dan harus di-track lagi besok.</CardContent>
        </Card>

        <Card className="bg-[#caf0f5] p-4 my-auto rounded-3xl shadow-md w-full lg:max-w-60">
          <CardHeader className="p-0">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold line-clamp-1">Note E</h1>
              <p className="text-sm font-medium text-textprimary/70 line-clamp-1">2025-06-21</p>
            </div>
            <div className="w-full h-0.5 bg-textprimary text-textprimary mt-3"></div>
          </CardHeader>

          <CardContent className="p-0 text-textprimary/80 leading-relaxed line-clamp-4">Catatan berisi inspirasi desain yang didapat dari lihat apps lain dan mau dicoba adaptasi.</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotesCardComponent;
