
const ekskulData = [
  { nama: "Paskibra", ikon: "🚩", kat: "Organisasi", desc: "Melatih disiplin dan baris-berbaris, serta bertugas sebagai pengibar bendera." },
  { nama: "Pramuka", ikon: "⛺", kat: "Organisasi", desc: "Belajar kemandirian, kepemimpinan, dan keterampilan alam bersama regu." },
  { nama: "PMR", ikon: "🩹", kat: "Organisasi", desc: "Palang Merah Remaja: pertolongan pertama dan kepedulian sosial." },
  { nama: "Jepun", ikon: "🎌", kat: "Seni & Media", desc: "Mengenal bahasa dan budaya Jepang lewat kegiatan yang seru." },
  { nama: "Silat", ikon: "🥋", kat: "Olahraga", desc: "Seni bela diri tradisional untuk melatih fisik, mental, dan sportivitas." },
  { nama: "Foster", ikon: "🤝", kat: "Organisasi", desc: "Komunitas belajar dan pengembangan diri bersama teman satu minat." },
  { nama: "Voli", ikon: "🏐", kat: "Olahraga", desc: "Latihan rutin bola voli dan persiapan untuk turnamen antar sekolah." },
  { nama: "Futsal", ikon: "⚽", kat: "Olahraga", desc: "Latihan teknik dan kerja sama tim untuk pertandingan futsal." },
  { nama: "Jurnalis", ikon: "📰", kat: "Seni & Media", desc: "Menulis berita, meliput kegiatan sekolah, dan mengelola media sekolah." },
  { nama: "MTQ", ikon: "📖", kat: "Keagamaan", desc: "Melatih tilawah dan seni baca Al-Qur'an untuk lomba." },
  { nama: "Rebana", ikon: "🥁", kat: "Seni & Media", desc: "Memainkan rebana dan melantunkan shalawat dalam berbagai acara." },
  { nama: "Rohis", ikon: "🕌", kat: "Keagamaan", desc: "Rohani Islam: kajian, kegiatan ibadah, dan peringatan hari besar." },
  { nama: "Padus", ikon: "🎤", kat: "Seni & Media", desc: "Paduan suara: olah vokal dan harmonisasi untuk penampilan sekolah." },
  { nama: "Drumband", ikon: "🎺", kat: "Seni & Media", desc: "Musik marching band yang tampil di upacara dan karnaval." },
  { nama: "Tari", ikon: "💃", kat: "Seni & Media", desc: "Belajar tari tradisional dan modern untuk pentas dan festival." },
];


const warna = {
  Paskibra: ["#e63946", "#ff8a3d"], Pramuka: ["#a16207", "#facc15"], PMR: ["#ef4444", "#ff8fab"],
  Jepun: ["#f43f5e", "#fb7185"], Silat: ["#1d4ed8", "#38bdf8"], Foster: ["#7c3aed", "#c084fc"],
  Voli: ["#f97316", "#fde047"], Futsal: ["#16a34a", "#86efac"], Jurnalis: ["#0891b2", "#67e8f9"],
  MTQ: ["#059669", "#6ee7b7"], Rebana: ["#d97706", "#fcd34d"], Rohis: ["#0d9488", "#5eead4"],
  Padus: ["#db2777", "#f9a8d4"], Drumband: ["#2563eb", "#a78bfa"], Tari: ["#c026d3", "#f472b6"],
};

const grid = document.getElementById("ekskulGrid");
const ticker = document.getElementById("tickerTrack");


function tampilkanEkskul(kategori) {
  grid.innerHTML = "";
  ekskulData
    .filter((e) => kategori === "Semua" || e.kat === kategori)
    .forEach((e) => {
      const kartu = document.createElement("article");
      kartu.className = "eks";
      kartu.dataset.cat = e.kat;
      const [c1, c2] = warna[e.nama];
      const berkas = "img/" + e.nama.toLowerCase() + ".jpg";
      kartu.innerHTML =
        '<div class="thumb" style="--c1:' + c1 + ";--c2:" + c2 + '">' +
        '<span class="emoji" aria-hidden="true">' + e.ikon + "</span>" +
        '<img src="' + berkas + '" alt="Kegiatan ' + e.nama + '" loading="lazy" onerror="this.remove()"></div>' +
        '<div class="body"><h3>' + e.nama + "</h3>" +
        '<span class="cat">' + e.kat + "</span>" +
        "<p>" + e.desc + "</p>" +
        '<button type="button" style="--c1:' + c1 + '">Daftar ' + e.nama + "</button></div>";
      kartu.querySelector("button").addEventListener("click", () => pilihEkskul(e.nama));
      grid.appendChild(kartu);
    });
}


function pilihEkskul(nama) {
  fields.ekskul.value = nama;
  validasiEkskul();
  document.getElementById("daftar").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => fields.nama.focus({ preventScroll: true }), 500);
}

document.getElementById("filters").addEventListener("click", (ev) => {
  const chip = ev.target.closest(".chip");
  if (!chip) return;
  document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  chip.classList.add("active");
  tampilkanEkskul(chip.dataset.cat);
});


const namaEkskul = ekskulData.map((e, i) => "<span class=\"t" + (i % 5) + "\">" + e.nama + "</span>").join("");
ticker.innerHTML = namaEkskul + namaEkskul;


const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
burger.addEventListener("click", () => {
  const terbuka = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", terbuka);
});
menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  })
);

document.getElementById("tahun").textContent = new Date().getFullYear();


const form = document.getElementById("formDaftar");
const pesanSukses = document.getElementById("pesanSukses");

const fields = {
  nama: document.getElementById("nama"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  konfirmasi: document.getElementById("konfirmasi"),
  ekskul: document.getElementById("ekskul"),
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function setStatus(field, pesan) {
  const errorEl = document.getElementById(field.id + "Error");
  if (pesan) {
    field.classList.add("invalid");
    field.classList.remove("valid");
    errorEl.textContent = pesan;
    errorEl.classList.add("show");
    return false;
  }
  field.classList.remove("invalid");
  field.classList.add("valid");
  errorEl.textContent = "";
  errorEl.classList.remove("show");
  return true;
}

function validasiNama() {
  const nilai = fields.nama.value.trim();
  if (nilai === "") return setStatus(fields.nama, "Nama lengkap tidak boleh kosong.");
  if (nilai.length < 3) return setStatus(fields.nama, "Nama minimal 3 karakter.");
  return setStatus(fields.nama, "");
}

function validasiEmail() {
  const nilai = fields.email.value.trim();
  if (nilai === "") return setStatus(fields.email, "Email tidak boleh kosong.");
  if (!emailRegex.test(nilai)) return setStatus(fields.email, "Format email tidak valid. Contoh: nama@email.com");
  return setStatus(fields.email, "");
}

function validasiPassword() {
  const nilai = fields.password.value;
  if (nilai === "") return setStatus(fields.password, "Password tidak boleh kosong.");
  if (nilai.length < 8) return setStatus(fields.password, "Password minimal 8 karakter.");
  return setStatus(fields.password, "");
}

function validasiKonfirmasi() {
  const nilai = fields.konfirmasi.value;
  if (nilai === "") return setStatus(fields.konfirmasi, "Konfirmasi password tidak boleh kosong.");
  if (nilai !== fields.password.value) return setStatus(fields.konfirmasi, "Konfirmasi password harus sama dengan password.");
  return setStatus(fields.konfirmasi, "");
}

function validasiEkskul() {
  if (fields.ekskul.value === "") return setStatus(fields.ekskul, "Pilih salah satu ekstrakurikuler.");
  return setStatus(fields.ekskul, "");
}

fields.nama.addEventListener("input", validasiNama);
fields.email.addEventListener("input", validasiEmail);
fields.password.addEventListener("input", () => {
  validasiPassword();
  if (fields.konfirmasi.value !== "") validasiKonfirmasi();
});
fields.konfirmasi.addEventListener("input", validasiKonfirmasi);
fields.ekskul.addEventListener("change", validasiEkskul);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const hasil = [validasiNama(), validasiEmail(), validasiPassword(), validasiKonfirmasi(), validasiEkskul()];

  if (hasil.every(Boolean)) {
    const nama = fields.nama.value.trim();
    const ekskul = fields.ekskul.value;
    pesanSukses.textContent = "Pendaftaran Berhasil! Selamat bergabung di " + ekskul + ", " + nama + ".";
    pesanSukses.hidden = false;
    alert("Pendaftaran Berhasil!");
    form.reset();
    Object.values(fields).forEach((f) => f.classList.remove("valid", "invalid"));
  } else {
    pesanSukses.hidden = true;
  }
});

tampilkanEkskul("Semua");
