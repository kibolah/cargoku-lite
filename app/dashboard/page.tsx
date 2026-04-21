// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Bell, LayoutDashboard, Package, Truck, MapPin, Plus, Menu, X, 
  UserCheck, Users, Moon, Sun, CheckCircle2, PackageSearch,
  Trash2, Edit, User, Wallet, SearchIcon, Info, ShieldCheck, 
  LogOut, TrendingUp, Search, Settings, Calculator, Store, ChevronDown
} from "lucide-react";

export default function DashboardPage() {
  // ==========================================
  // STATE GLOBAL & UI
  // ==========================================
  const [activeMenu, setActiveMenu] = useState("dashboard"); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userRole, setUserRole] = useState("Pelanggan"); 

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // ==========================================
  // STATE PROFIL PENGGUNA (PELANGGAN)
  // ==========================================
  const [userProfile, setUserProfile] = useState({
    nama: "Alika Kristin Malau", noHp: "6285840400040", email: "", perusahaan: "", alamat: ""
  });
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...userProfile });

  // ==========================================
  // STATE DATA: PESANAN, PENGIRIM, PENERIMA
  // ==========================================
  const [orders, setOrders] = useState([]);
  const [senders, setSenders] = useState([]);
  const [receivers, setReceivers] = useState([]);

  // ==========================================
  // FETCH DATA MYSQL (API) DENGAN SAFETY CHECK
  // ==========================================
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) setUserRole(savedRole);

    const fetchData = async () => {
      try {
        const resOrders = await fetch('/api/orders');
        if (resOrders.ok && resOrders.headers.get('content-type')?.includes('application/json')) {
          const data = await resOrders.json();
          if (data && data.length > 0) {
            setOrders(data.map((o: any) => ({
              resi: o.no_resi, itemName: o.nama_barang || "Paket Barang Umum", date: new Date(o.tgl_pesanan).toLocaleDateString('id-ID'),
              sender: o.pengirim?.nama_pengirim || "Unknown", receiver: o.penerima?.nama_penerima || "Unknown",
              status: o.status, service: o.layanan || "REGULAR", fee: `Rp${o.total_bayar.toLocaleString('id-ID')}`
            })));
          }
        }
      } catch (err) { console.warn("API Orders error/belum siap"); }

      if (savedRole === "Admin" || userRole === "Admin") {
        try {
          const resS = await fetch('/api/senders');
          if (resS.ok && resS.headers.get('content-type')?.includes('application/json')) {
            const dS = await resS.json(); 
            setSenders(dS.map((item: any) => ({ id: item.id, name: item.nama_pengirim, phone: item.no_telepon, address: item.alamat, kecamatan: item.kecamatan, kode_pos: item.kode_pos, is_utama: item.is_utama })));
          }
        } catch (err) { console.warn("API Senders error"); }

        try {
          const resR = await fetch('/api/receivers');
          if (resR.ok && resR.headers.get('content-type')?.includes('application/json')) {
            const dR = await resR.json(); 
            setReceivers(dR.map((item: any) => ({ id: item.id, name: item.nama_penerima, phone: item.no_telepon, address: item.alamat, kecamatan: item.kecamatan, kode_pos: item.kode_pos })));
          }
        } catch (err) { console.warn("API Receivers error"); }
      }
    };

    if (orders.length === 0) {
      setOrders([
        { resi: "CGK-2001", itemName: "Kemeja Flanel", date: "20/4/2026", sender: "Toko Maju Jaya", receiver: "Budi Santoso", status: "PROSES", service: "EXPRESS", fee: "Rp25.000" },
        { resi: "CGK-2002", itemName: "Sepatu Sneakers", date: "20/4/2026", sender: "Berkah Grosir", receiver: "Siti Aminah", status: "INPUT", service: "REGULAR", fee: "Rp12.000" },
        { resi: "CGK-2003", itemName: "Setrika Listrik", date: "20/4/2026", sender: "Sentosa Elektronik", receiver: "Andi Saputra", status: "SELESAI", service: "ECONOMY", fee: "Rp10.000" },
        { resi: "CGK-2004", itemName: "Gamis Syari", date: "20/4/2026", sender: "Alika Store", receiver: "Rina Marlina", status: "PROSES", service: "EXPRESS", fee: "Rp25.000" }, 
        { resi: "CGK-2005", itemName: "Tas Selempang Pria", date: "20/4/2026", sender: "Sepatu Kita", receiver: "Joko Widodo", status: "INPUT", service: "REGULAR", fee: "Rp15.000" },
        { resi: "CGK-2006", itemName: "Skincare Serum", date: "19/4/2026", sender: "Alika Store", receiver: "Dewi Lestari", status: "SELESAI", service: "EXPRESS", fee: "Rp22.000" }, 
        { resi: "CGK-2007", itemName: "Buku Novel", date: "19/4/2026", sender: "Buku Laris", receiver: "Rizky Pratama", status: "PROSES", service: "REGULAR", fee: "Rp12.000" },
        { resi: "CGK-2008", itemName: "Mainan Anak Rakitan", date: "19/4/2026", sender: "Mainan Anak Shop", receiver: "Nita Permata", status: "SELESAI", service: "ECONOMY", fee: "Rp9.000" },
        { resi: "CGK-2009", itemName: "Snack Keripik Pedas", date: "18/4/2026", sender: "Snack Gurih", receiver: "Agus Setiawan", status: "SELESAI", service: "EXPRESS", fee: "Rp30.000" },
        { resi: "CGK-2010", itemName: "Kopi Bubuk Arabika", date: "18/4/2026", sender: "Dapur Nenek", receiver: "Dian Sastrowardoyo", status: "SELESAI", service: "REGULAR", fee: "Rp15.000" },
        { resi: "CGK-2011", itemName: "Celana Jeans Denim", date: "18/4/2026", sender: "Toko Maju Jaya", receiver: "Fahri Hamzah", status: "PICK-UP", service: "EXPRESS", fee: "Rp25.000" },
        { resi: "CGK-2012", itemName: "Hoodie Polos", date: "17/4/2026", sender: "Alika Store", receiver: "Indah Permatasari", status: "SELESAI", service: "ECONOMY", fee: "Rp10.000" }, 
        { resi: "CGK-2013", itemName: "Powerbank 10000mAh", date: "17/4/2026", sender: "Sentosa Elektronik", receiver: "Gilang Dirga", status: "INPUT", service: "REGULAR", fee: "Rp18.000" },
        { resi: "CGK-2014", itemName: "Jam Tangan Pria", date: "17/4/2026", sender: "Alika Store", receiver: "Citra Kirana", status: "DALAM PENGIRIMAN", service: "EXPRESS", fee: "Rp24.000" }, 
        { resi: "CGK-2015", itemName: "Helm Half Face SNI", date: "16/4/2026", sender: "Sepatu Kita", receiver: "Vino G. Bastian", status: "SELESAI", service: "REGULAR", fee: "Rp14.000" },
        { resi: "CGK-2016", itemName: "Headset Bluetooth", date: "16/4/2026", sender: "Alika Store", receiver: "Luna Maya", status: "SELESAI", service: "EXPRESS", fee: "Rp28.000" }, 
        { resi: "CGK-2017", itemName: "Casing HP", date: "16/4/2026", sender: "Buku Laris", receiver: "Nicholas Saputra", status: "INPUT", service: "ECONOMY", fee: "Rp8.000" },
        { resi: "CGK-2018", itemName: "Boneka Beruang", date: "15/4/2026", sender: "Mainan Anak Shop", receiver: "Tara Basro", status: "PROSES", service: "REGULAR", fee: "Rp15.000" },
        { resi: "CGK-2019", itemName: "Kue Kering", date: "15/4/2026", sender: "Snack Gurih", receiver: "Iqbaal Ramadhan", status: "SELESAI", service: "EXPRESS", fee: "Rp25.000" },
        { resi: "CGK-2020", itemName: "Bumbu Dapur", date: "15/4/2026", sender: "Alika Store", receiver: "Chelsea Islan", status: "SELESAI", service: "REGULAR", fee: "Rp12.000" }, 
        { resi: "CGK-2021", itemName: "Jaket Kulit", date: "14/4/2026", sender: "Kibolah Toys & Hobbies", receiver: "Lukman Sardi", status: "SELESAI", service: "EXPRESS", fee: "Rp35.000" },
        { resi: "CGK-2022", itemName: "Sandal Jepit", date: "14/4/2026", sender: "Berkah Grosir", receiver: "Dwi Sasono", status: "DALAM PENGIRIMAN", service: "REGULAR", fee: "Rp16.000" },
        { resi: "CGK-2023", itemName: "Kabel Data", date: "14/4/2026", sender: "Sentosa Elektronik", receiver: "Reza Rahadian", status: "INPUT", service: "ECONOMY", fee: "Rp10.000" },
        { resi: "CGK-2024", itemName: "Mukena Silk", date: "13/4/2026", sender: "Alika Store", receiver: "Aura Kasih", status: "SELESAI", service: "EXPRESS", fee: "Rp22.000" }, 
        { resi: "CGK-2025", itemName: "Kaos Kaki", date: "13/4/2026", sender: "Sepatu Kita", receiver: "Pevita Pearce", status: "SELESAI", service: "REGULAR", fee: "Rp15.000" }
      ]);
    }
    fetchData();
  }, [userRole, orders.length]);

  // ==========================================
  // KALKULASI STATISTIK
  // ==========================================
  const displayedOrders = userRole === "Admin" ? orders : orders.filter(o => o.sender.toLowerCase().includes("alika"));
  const totalOrdersCount = displayedOrders.length; 
  const activeOrdersCount = displayedOrders.filter(o => o.status.toUpperCase() !== "SELESAI").length;
  const completedOrdersCount = displayedOrders.filter(o => o.status.toUpperCase() === "SELESAI").length;
  const successRate = totalOrdersCount > 0 ? Math.round((completedOrdersCount / totalOrdersCount) * 100) : 0;
  const formattedSpent = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(displayedOrders.reduce((sum, o) => sum + (parseInt(o.fee.replace(/\D/g, '')) || 0), 0));

  // ==========================================
  // STATE CEK ONGKIR (PELANGGAN)
  // ==========================================
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [shippingResults, setShippingResults] = useState([]);
  const [submittedRoute, setSubmittedRoute] = useState(null); 
  const mockLocations = ["Pakem, Kab. Sleman", "Depok, Kab. Sleman", "Tambun Utara, Kab. Bekasi", "Menteng, Kota Jakarta Pusat", "Cicendo, Kota Bandung"];

  // ==========================================
  // STATE INPUT PESANAN & DATABASE (ADMIN)
  // ==========================================
  const [currentStepModal, setCurrentStepModal] = useState(1);
  const [orderSender, setOrderSender] = useState({ name: "", phone: "", address: "" });
  const [orderReceiver, setOrderReceiver] = useState({ name: "", phone: "", address: "", item: "", weight: "" });
  const [isSelectSenderModalOpen, setIsSelectSenderModalOpen] = useState(false);
  const [isSelectReceiverModalOpen, setIsSelectReceiverModalOpen] = useState(false);
  const [selectedSenderIndexModal, setSelectedSenderIndexModal] = useState(null);
  const [selectedReceiverIndexModal, setSelectedReceiverIndexModal] = useState(null);

  const [isAddSenderModalOpen, setIsAddSenderModalOpen] = useState(false);
  const [isAddReceiverModalOpen, setIsAddReceiverModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", kecamatan: "", kode_pos: "", is_utama: false });

  // ==========================================
  // HANDLERS: SIMPAN MYSQL DAN LAINNYA
  // ==========================================
  const handleSaveProfile = () => { setUserProfile({ ...tempProfile }); setIsEditProfileOpen(false); };

  const handleCekOngkir = () => { 
    if (!origin || !destination || !weight) { alert("Harap isi Asal, Tujuan, dan Berat paket!"); return; }
    setSubmittedRoute({ origin, destination });
    const finalWeight = Math.ceil(Math.max(parseFloat(weight) || 1, (parseFloat(length)*parseFloat(width)*parseFloat(height))/6000 || 0)); 
    setShippingResults([
      { service: "EXPRESS", desc: "Pengiriman Super Cepat Besok Sampai", price: `Rp ${(finalWeight * 25000).toLocaleString('id-ID')}`, estimation: "1 hari" },
      { service: "REGULAR", desc: "Pengiriman Cepat & Murah", price: `Rp ${(finalWeight * 15000).toLocaleString('id-ID')}`, estimation: "2 - 4 hari" },
      { service: "ECONOMY", desc: "Pengiriman Dalam Jumlah Banyak", price: `Rp ${(finalWeight * 10000).toLocaleString('id-ID')}`, estimation: "4 - 7 hari" },
    ]);
  };

  const handleSaveAdminData = async (type) => {
    const endpoint = type === 'sender' ? '/api/senders' : '/api/receivers';
    
    const payload = type === 'sender' ? { 
      nama_pengirim: formData.name, no_telepon: formData.phone, alamat: formData.address, kecamatan: formData.kecamatan, kode_pos: formData.kode_pos, is_utama: formData.is_utama ? 1 : 0 
    } : { 
      nama_penerima: formData.name, no_telepon: formData.phone, alamat: formData.address, kecamatan: formData.kecamatan, kode_pos: formData.kode_pos 
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Gagal simpan ke DB");
      const result = await response.json(); 

      const newData = { ...formData, id: result.id || Date.now() }; 
      if(type === 'sender') { setSenders([...senders, newData]); setIsAddSenderModalOpen(false); } 
      else { setReceivers([...receivers, newData]); setIsAddReceiverModalOpen(false); }
      
      setFormData({name: "", phone: "", address: "", kecamatan: "", kode_pos: "", is_utama: false});
      alert(`Berhasil disimpan ke Database MySQL!`);
    } catch (error) { 
      console.error(error);
      alert("Gagal menyimpan data! Pastikan API Route aktif."); 
    }
  };

  const handleConfirmSelectSender = () => { if(selectedSenderIndexModal !== null) { setOrderSender(senders[selectedSenderIndexModal]); setIsSelectSenderModalOpen(false); } };
  const handleConfirmSelectReceiver = () => { if(selectedReceiverIndexModal !== null) { setOrderReceiver(receivers[selectedReceiverIndexModal]); setIsSelectReceiverModalOpen(false); } };
  const handleNextStep = () => { 
    if(currentStepModal < 3) setCurrentStepModal(currentStepModal + 1); 
    else { alert("Pesanan Berhasil Disimpan!"); setCurrentStepModal(1); setOrderSender({name:"", phone:"", address:""}); setOrderReceiver({name:"", phone:"", address:"", item:"", weight:""}); setActiveMenu("pesanan"); } 
  };

  const menuItems = userRole === "Admin" ? [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "pesanan", label: "Semua Pesanan", icon: Package },
    { id: "buat-pesanan", label: "Input Pesanan", icon: Plus },
    { id: "pengirim", label: "Data Pengirim", icon: UserCheck },
    { id: "penerima", label: "Data Penerima", icon: Users },
  ] : [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "pesanan", label: "Pesanan Saya", icon: Package },
    { id: "cek-ongkir", label: "Cek Ongkir", icon: Search },
    { id: "pengaturan", label: "Pengaturan", icon: Settings },
  ];
// ========================================================
  // RENDER MODAL: PILIH PENGIRIM / PENERIMA (INPUT PESANAN ADMIN)
  // ========================================================
  const renderSelectModal = (isSender) => {
    const list = isSender ? senders : receivers;
    const selectedIdx = isSender ? selectedSenderIndexModal : selectedReceiverIndexModal;
    const setIdx = isSender ? setSelectedSenderIndexModal : setSelectedReceiverIndexModal;
    const close = () => isSender ? setIsSelectSenderModalOpen(false) : setIsSelectReceiverModalOpen(false);
    const confirm = isSender ? handleConfirmSelectSender : handleConfirmSelectReceiver;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-in fade-in">
        <div className={`relative w-full max-w-3xl rounded-[2rem] shadow-2xl overflow-hidden ${isDarkMode ? "bg-slate-800" : "bg-white"}`}>
          <div className={`p-6 flex items-center justify-between border-b ${isDarkMode ? "border-slate-700" : "border-slate-200"}`}>
            <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Pilih Kontak {isSender ? "Pengirim" : "Penerima"}</h3>
            <button onClick={close} className={isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"}><X size={24} /></button>
          </div>
          <div className="p-6 space-y-4">
            <div className={`flex items-center gap-2 w-full px-4 py-3 rounded-xl border focus-within:border-[#008f7a] ${isDarkMode ? "bg-slate-900 border-slate-700" : "bg-white border-slate-300"}`}>
              <SearchIcon size={18} className="text-slate-400" />
              <input type="text" placeholder={`Cari Kontak ${isSender ? "Pengirim" : "Penerima"}...`} className={`bg-transparent border-none outline-none text-sm w-full font-bold ${isDarkMode ? "text-white placeholder-slate-600" : "text-slate-900 placeholder-slate-400"}`} />
            </div>
            <div className={`max-h-64 overflow-y-auto border rounded-xl ${isDarkMode ? "border-slate-700" : "border-slate-200"}`}>
              {list.length === 0 ? <div className="p-8 text-center text-slate-400 font-bold italic">Database {isSender ? "Pengirim" : "Penerima"} Kosong. Tambah data di menu Admin.</div> : list.map((item, idx) => (
                <div key={idx} onClick={() => setIdx(idx)} className={`p-4 flex items-center gap-4 border-b last:border-0 cursor-pointer transition-colors ${selectedIdx === idx ? (isDarkMode ? 'bg-[#008f7a]/20' : 'bg-[#008f7a]/10') : (isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-50')} ${isDarkMode ? "border-slate-700" : "border-slate-200"}`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedIdx === idx ? "border-[#008f7a]" : "border-slate-300"}`}>
                    {selectedIdx === idx && <div className="w-2.5 h-2.5 rounded-full bg-[#008f7a]"></div>}
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>{item.name}</div>
                    <div className="text-xs text-slate-500">{item.phone}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={confirm} className="w-full bg-[#008f7a] hover:bg-teal-700 text-white py-3.5 rounded-xl font-bold shadow-md transition-all">Gunakan Kontak Terpilih</button>
          </div>
        </div>
      </div>
    );
  };

  // ========================================================
  // RENDER MENU: DASHBOARD
  // ========================================================
  const renderDashboard = () => (
    <div className="animate-in fade-in duration-500 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Halo, {userRole === "Admin" ? "Administrator" : userProfile.nama}! 👋</h2>
      </div>

      {userRole === "Pelanggan" ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-[1.5rem] border shadow-sm flex flex-col justify-between ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
              <div>
                <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">PAKET SEDANG DIPROSES</p>
                <div className="flex items-baseline gap-2 mt-4"><h3 className="text-5xl font-black text-[#008f7a]">{activeOrdersCount}</h3><span className="text-xl font-bold text-slate-500">Paket</span></div>
              </div>
              <button onClick={() => setActiveMenu("pesanan")} className="mt-8 text-[#008f7a] text-sm font-bold bg-[#e6f4f2] px-6 py-3 rounded-2xl w-fit transition-colors hover:bg-teal-100">
                Lihat Daftar Paket →
              </button>
            </div>

            <div className={`p-6 rounded-[1.5rem] border shadow-sm flex flex-col justify-between ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
              <div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? "bg-slate-700 text-slate-300" : "bg-[#e6f4f2] text-[#008f7a]"}`}>
                   <Calculator size={24} />
                </div>
                <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Cek Ongkir</h3>
                <p className="text-xs opacity-60 font-medium mt-1">Cek estimasi tarif pengiriman ke seluruh Indonesia.</p>
              </div>
              <button onClick={() => setActiveMenu("cek-ongkir")} className="mt-5 bg-[#008f7a] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-teal-700 transition-colors w-fit">
                Cek Sekarang
              </button>
            </div>

            <div className={`p-6 rounded-[1.5rem] border shadow-sm flex flex-col justify-between ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
              <div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-600"}`}>
                   <MapPin size={24} />
                </div>
                <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Lacak Pesanan</h3>
                <p className="text-xs opacity-60 font-medium mt-1">Ketahui posisi paketmu saat ini dengan nomor resi.</p>
              </div>
              <div className="flex items-center gap-2 w-full mt-5">
                 <input type="text" placeholder="Masukkan No. Resi..." className={`flex-1 border rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:border-[#008f7a] ${isDarkMode ? "bg-slate-900 border-slate-700 text-white placeholder-slate-500" : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"}`} />
                 <button onClick={() => alert("Mencari data resi...")} className="bg-[#008f7a] text-white p-2.5 rounded-xl shadow-md hover:bg-teal-700 transition-colors">
                    <Search size={18}/>
                 </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              <TrendingUp size={20} className="text-[#008f7a]" /> Statistik Pengirimanmu
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className={`p-6 rounded-[1.5rem] border shadow-sm relative overflow-hidden flex justify-between items-start ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
                  <div>
                     <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Total Pesanan</p>
                     <h4 className="text-3xl font-black text-[#008f7a] mt-1">{totalOrdersCount} <span className="text-sm font-bold text-slate-400">Paket</span></h4>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? "bg-slate-700 text-slate-300" : "bg-[#e6f4f2] text-[#008f7a]"}`}>
                     <Package size={20}/>
                  </div>
               </div>
               
               <div className={`p-6 rounded-[1.5rem] border shadow-sm ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
                  <div className="flex justify-between items-center mb-1">
                     <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Pesanan Selesai</p>
                     <span className="text-xs font-black text-[#008f7a]">{successRate}%</span>
                  </div>
                  <h4 className="text-3xl font-black text-[#008f7a] mt-1">{completedOrdersCount} <span className="text-sm font-bold text-slate-400">Paket</span></h4>
                  <div className={`w-full rounded-full h-2 mt-3 ${isDarkMode ? "bg-slate-700" : "bg-[#e6f4f2]"}`}>
                     <div className="bg-[#008f7a] h-2 rounded-full transition-all duration-1000" style={{ width: `${successRate}%` }}></div>
                  </div>
               </div>

               <div className={`p-6 rounded-[1.5rem] border shadow-sm flex justify-between items-start ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
                  <div>
                     <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Total Ongkos Kirim</p>
                     <h4 className={`text-2xl font-black mt-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>{formattedSpent}</h4>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? "bg-slate-700 text-slate-300" : "bg-[#e6f4f2] text-[#008f7a]"}`}>
                     <Wallet size={20}/>
                  </div>
               </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={`p-6 md:p-8 rounded-[1.5rem] border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
             <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-[#008f7a] ${isDarkMode ? "bg-slate-700" : "bg-[#e6f4f2]"}`}>
                   <Users size={32} />
                </div>
                <div>
                   <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>CargoKu Lite: Admin Control Center</h3>
                   <p className="text-sm text-slate-500 mt-1">Kelola database dan semua pengiriman.</p>
                </div>
             </div>
             <button onClick={() => setActiveMenu("buat-pesanan")} className="bg-[#bd3232] text-white font-bold py-3 px-8 rounded-full text-sm shadow-md hover:bg-red-700 transition-colors">
                + Buat Pesanan Baru
             </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, label: "Semua Pesanan", onClick: () => setActiveMenu("pesanan") },
              { icon: PackageSearch, label: "Input Pesanan", onClick: () => setActiveMenu("buat-pesanan") },
              { icon: UserCheck, label: "Data Pengirim", onClick: () => setActiveMenu("pengirim") },
              { icon: Users, label: "Data Penerima", onClick: () => setActiveMenu("penerima") },
            ].map((card, idx) => (
              <div key={idx} onClick={card.onClick} className={`flex flex-col items-center justify-center gap-4 p-8 rounded-[1.5rem] cursor-pointer transition-all hover:border-[#008f7a] border shadow-sm ${isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-800"}`}>
                <card.icon size={32} className="text-[#008f7a]" />
                <span className="font-bold text-sm text-center">{card.label}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  // ========================================================
  // RENDER MENU: PESANAN
  // ========================================================
  const renderPesanan = () => (
    <div className="animate-in fade-in duration-500 space-y-6">
      <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>{userRole === "Admin" ? "Manajemen Semua Pesanan" : "Pesanan Saya"}</h2>
      
      <div className={`border rounded-[1.5rem] overflow-hidden shadow-sm ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
         <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse whitespace-nowrap">
               <thead className={`${isDarkMode ? "bg-slate-700 text-slate-300" : "bg-[#e2e8f0] text-slate-700"} text-[10px] font-black uppercase tracking-widest`}>
                 <tr>
                   <th className="p-5 font-bold">No. Resi</th>
                   <th className="p-5 font-bold">Nama Barang</th>
                   <th className="p-5 font-bold">Tanggal</th>
                   <th className="p-5 font-bold">Pengirim</th>
                   <th className="p-5 font-bold">Penerima</th>
                   <th className="p-5 font-bold">Layanan</th>
                   <th className="p-5 text-center font-bold">Status</th>
                 </tr>
               </thead>
               <tbody className={`${isDarkMode ? "bg-slate-800" : "bg-white"}`}>
                 {displayedOrders.length === 0 ? (
                   <tr>
                     <td colSpan="7" className="p-10 text-center font-bold opacity-50">Belum ada data pesanan.</td>
                   </tr>
                 ) : (
                   displayedOrders.map((o, idx) => {
                     let statusColor = "bg-slate-100 text-slate-600";
                     const statusUpper = o.status.toUpperCase();
                     
                     if (statusUpper === "SELESAI") { statusColor = "bg-emerald-50 text-emerald-600"; } 
                     else if (statusUpper === "PROSES" || statusUpper === "INPUT" || statusUpper === "DALAM PENGIRIMAN") { statusColor = "bg-blue-50 text-blue-600"; } 
                     else if (statusUpper === "PICK-UP") { statusColor = "bg-amber-50 text-amber-600"; }

                     return (
                       <tr key={idx} className={`border-b last:border-0 text-sm transition-colors ${isDarkMode ? "border-slate-700 hover:bg-slate-700/50" : "border-slate-200 hover:bg-slate-50"}`}>
                         <td className="p-5 font-black text-[#008f7a] tracking-wide">{o.resi}</td>
                         <td className={`p-5 font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>{o.itemName}</td>
                         <td className={`p-5 font-medium ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{o.date}</td>
                         <td className={`p-5 font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-900"}`}>{o.sender}</td>
                         <td className={`p-5 font-medium ${isDarkMode ? "text-slate-300" : "text-slate-900"}`}>{o.receiver}</td>
                         <td className={`p-5 font-black ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>{o.service}</td>
                         <td className="p-5 text-center">
                           <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${statusColor}`}>
                             {o.status}
                           </span>
                         </td>
                       </tr>
                     );
                   })
                 )}
               </tbody>
             </table>
         </div>
      </div>
    </div>
  );

  // ========================================================
  // RENDER MENU: CEK ONGKIR (PELANGGAN SAJA)
  // ========================================================
  const renderCekOngkir = () => (
    <div className="animate-in fade-in space-y-6">
      <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Cek Ongkir</h2>
      
      <div className={`p-6 md:p-8 rounded-[1.5rem] border shadow-sm ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
           <div>
              <label className={`block text-sm font-bold mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}><span className="text-red-500">*</span> Asal Pengiriman</label>
              <div className="relative">
                 <select value={origin} onChange={(e) => setOrigin(e.target.value)} className={`w-full appearance-none border rounded-xl px-4 py-3.5 text-sm font-bold outline-none focus:border-[#008f7a] ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"}`}>
                    <option value="" disabled>Pilih Kecamatan/Kota/Provinsi</option>
                    {mockLocations.map((loc, i) => <option key={i} value={loc}>{loc}</option>)}
                 </select>
                 <ChevronDown size={16} className="absolute right-4 top-4 opacity-50 pointer-events-none"/>
              </div>
           </div>
           
           <div>
              <label className={`block text-sm font-bold mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}><span className="text-red-500">*</span> Tujuan Pengiriman</label>
              <div className="relative">
                 <select value={destination} onChange={(e) => setDestination(e.target.value)} className={`w-full appearance-none border rounded-xl px-4 py-3.5 text-sm font-bold outline-none focus:border-[#008f7a] ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"}`}>
                    <option value="" disabled>Pilih Kecamatan/Kota/Provinsi</option>
                    {mockLocations.map((loc, i) => <option key={i} value={loc}>{loc}</option>)}
                 </select>
                 <ChevronDown size={16} className="absolute right-4 top-4 opacity-50 pointer-events-none"/>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
           {[{l:"Berat (kg)", v:weight, s:setWeight}, {l:"P (cm)", v:length, s:setLength}, {l:"L (cm)", v:width, s:setWidth}, {l:"T (cm)", v:height, s:setHeight}].map((f, i) => (
             <input key={i} type="number" placeholder={f.l} value={f.v} onChange={(e) => f.s(e.target.value)} className={`border rounded-xl px-4 py-3.5 text-sm font-bold outline-none focus:border-[#008f7a] ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"}`} />
           ))}
        </div>

        <button onClick={handleCekOngkir} className="w-full bg-[#008f7a] hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
           <Calculator size={20} /> Cek Harga Ongkir
        </button>
      </div>

      {shippingResults.length > 0 && submittedRoute && (
         <div className="mt-8 animate-in slide-in-from-bottom-4 space-y-6">
            <div className={`p-4 border rounded-xl flex items-start gap-3 shadow-sm ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
               <Info size={20} className="text-[#008f7a] shrink-0 mt-0.5" />
               <div>
                  <h4 className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Informasi Tambahan</h4>
                  <p className="text-xs text-slate-500 mt-1">Tarif di aplikasi dapat berbeda sesuai dengan kesepakatan promosi & kerjasama dengan agen.</p>
               </div>
            </div>

            <div className={`p-6 border rounded-[1.5rem] shadow-sm ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
               <div className="flex gap-4 items-start relative pl-2">
                  <div className="flex flex-col items-center">
                     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isDarkMode ? "border-slate-500 bg-slate-800" : "border-slate-300 bg-white"}`}><Store size={12} className="text-slate-400" /></div>
                     <div className="w-0.5 h-10 border-l-2 border-dashed border-slate-300 dark:border-slate-600 my-1"></div>
                     <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#008f7a] text-white"><MapPin size={12} /></div>
                  </div>
                  <div className="flex flex-col justify-between h-full pb-1">
                     <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Dikirim dari</p>
                        <p className={`text-sm font-black mt-0.5 ${isDarkMode ? "text-white" : "text-slate-900"}`}>{submittedRoute.origin}</p>
                     </div>
                     <div className="mt-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tujuan pengantaran</p>
                        <p className={`text-sm font-black mt-0.5 ${isDarkMode ? "text-white" : "text-slate-900"}`}>{submittedRoute.destination}</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {shippingResults.map((r, i) => (
               <div key={i} className={`relative p-6 pb-8 rounded-[1.5rem] border shadow-sm flex flex-col items-center text-center transition-colors ${isDarkMode ? "bg-slate-800 border-slate-700 hover:border-[#008f7a]" : "bg-white border-slate-200 hover:border-[#008f7a]"}`}>
                  <div className="flex justify-end w-full absolute top-5 px-5 left-0">
                     <span className="bg-cyan-50 text-cyan-700 text-[10px] font-black px-3 py-1.5 rounded-md border border-cyan-100">{r.estimation}</span>
                  </div>
                  <div className="mt-8 mb-2 h-12 flex items-center justify-center">
                     <span className="text-3xl font-black italic text-[#008f7a] tracking-tighter">{r.service}</span>
                  </div>
                  <p className={`text-xs font-medium mt-1 mb-8 h-6 px-4 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{r.desc}</p>
                  <div className="mt-auto w-full pt-4 border-t border-slate-100 dark:border-slate-700">
                     <p className={`text-[10px] uppercase font-black tracking-widest mb-1 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Total Tarif</p>
                     <p className={`text-2xl font-black ${isDarkMode ? "text-[#008f7a]" : "text-slate-900"}`}>{r.price}</p>
                  </div>
               </div>
               ))}
            </div>
         </div>
      )}
    </div>
  );
// ========================================================
  // RENDER MENU: PENGATURAN (PELANGGAN SAJA)
  // ========================================================
  const renderPengaturan = () => (
    <div className="animate-in fade-in duration-500 space-y-6">
      <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#001b3a]"}`}>Detail Informasi Perusahaan</h2>
      
      <div className={`p-8 md:p-10 rounded-[1.5rem] border shadow-sm ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
         <div className="space-y-4">
            {[
              { l: "Nama", v: userProfile.nama || "-" },
              { l: "Nomor HP", v: userProfile.noHp || "-" },
              { l: "Email", v: userProfile.email || "-" },
              { l: "Perusahaan", v: userProfile.perusahaan || "-" },
              { l: "Alamat", v: userProfile.alamat || "-" }
            ].map((item, idx) => (
              <div key={idx} className="grid grid-cols-[120px_20px_1fr] md:grid-cols-[150px_20px_1fr] items-center text-sm md:text-base">
                 <span className={`${isDarkMode ? "text-slate-400" : "text-[#004268]"} font-medium`}>{item.l}</span>
                 <span className={`${isDarkMode ? "text-slate-400" : "text-slate-900"} font-bold`}>:</span>
                 {/* Anti Hantu: Teks hitam pekat di mode terang */}
                 <span className={`${isDarkMode ? "text-white" : "text-slate-900"} font-bold`}>{item.v}</span>
              </div>
            ))}
         </div>

         <button 
           onClick={() => { setTempProfile({...userProfile}); setIsEditProfileOpen(true); }} 
           className="mt-8 px-10 py-2.5 rounded-full border-2 border-[#bd3232] text-[#bd3232] font-bold hover:bg-red-50 transition-colors text-sm bg-transparent"
         >
           Edit
         </button>
      </div>

      {/* MODAL EDIT PROFIL */}
      {isEditProfileOpen && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <div className="bg-white rounded-[1.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95">
               <div className="bg-[#008f7a] p-6 text-white flex justify-between items-center font-bold">
                  <h3>Edit Detail Informasi</h3>
                  <button onClick={() => setIsEditProfileOpen(false)}><X size={20}/></button>
               </div>
               <div className="p-8 space-y-5">
                  {[ {l:"Nama", k:"nama", t:"text"}, {l:"Nomor HP", k:"noHp", t:"text"}, {l:"Email", k:"email", t:"email"}, {l:"Perusahaan", k:"perusahaan", t:"text"}, {l:"Alamat", k:"alamat", t:"text"} ].map((f, i) => (
                    <div key={i}>
                       <label className="text-xs font-bold text-slate-500 mb-1 block">{f.l}</label>
                       <input type={f.t} value={tempProfile[f.k]} onChange={(e) => setTempProfile({...tempProfile, [f.k]: e.target.value})} className="w-full border-b-2 border-slate-200 py-2 font-bold text-slate-900 outline-none focus:border-[#008f7a] transition-colors" />
                    </div>
                  ))}
                  <div className="pt-6 flex gap-3">
                     <button onClick={() => setIsEditProfileOpen(false)} className="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">Batal</button>
                     <button onClick={handleSaveProfile} className="flex-1 py-3 bg-[#008f7a] hover:bg-teal-700 text-white rounded-xl font-bold shadow-md transition-colors">Simpan Perubahan</button>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );

  // ========================================================
  // RENDER MENU: DATABASE PENGIRIM & PENERIMA (ADMIN SAJA)
  // ========================================================
  const renderDatabase = (isSender) => {
    const dataList = isSender ? senders : receivers;
    const title = isSender ? "Pengirim" : "Penerima";
    
    return (
      <div className="animate-in fade-in space-y-6">
        <div className="flex justify-between items-center">
          <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Database {title}</h2>
          <button onClick={() => isSender ? setIsAddSenderModalOpen(true) : setIsAddReceiverModalOpen(true)} className="bg-[#008f7a] text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-teal-700 transition-colors">+ Tambah Baru</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dataList.length === 0 ? <div className="p-10 border-2 border-dashed rounded-3xl text-center text-slate-400 font-bold italic col-span-2">Belum ada data. Tambah data baru untuk menyimpan ke MySQL.</div> : dataList.map((item, idx) => (
          <div key={idx} className={`p-6 border rounded-3xl shadow-sm flex justify-between items-start ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
            <div>
              <p className={`font-bold text-lg ${isDarkMode ? "text-white" : "text-slate-900"}`}>{item.name}</p>
              <p className="text-sm opacity-80 text-slate-500">{item.phone}</p>
              {item.address && <p className="text-xs mt-2 text-slate-400">{item.address}</p>}
            </div>
            <button onClick={() => isSender ? setSenders(senders.filter((_,i)=>i!==idx)) : setReceivers(receivers.filter((_,i)=>i!==idx))} className="text-red-500 p-2 bg-red-50 rounded-xl dark:bg-red-900/20 hover:bg-red-100 transition-colors"><Trash2 size={16}/></button>
          </div>
        ))}</div>
      </div>
    );
  };

  // ========================================================
  // RENDER MENU: INPUT PESANAN 3 TAHAP (ADMIN SAJA)
  // ========================================================
  const renderBuatPesanan = () => (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className={`flex items-center gap-4 p-4 rounded-3xl ${isDarkMode ? "bg-slate-800" : "bg-teal-50"}`}>
        {[1, 2, 3].map(s => (
          <div key={s} className="flex-1 flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${currentStepModal >= s ? 'bg-[#008f7a] text-white' : 'bg-slate-200 text-slate-500'}`}>{s}</div>
            <div className={`flex-1 h-1 rounded-full ${currentStepModal > s ? 'bg-[#008f7a]' : 'bg-slate-200'}`}></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {currentStepModal === 1 && (
            <div className={`p-8 border rounded-[2rem] space-y-6 ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
              <div className="flex justify-between items-center"><h3 className={`text-xl font-bold ${isDarkMode?"text-white":"text-black"}`}>Detail Pengirim</h3><button onClick={() => setIsSelectSenderModalOpen(true)} className="text-[#008f7a] font-bold text-sm hover:underline">Pilih dari Database</button></div>
              <input placeholder="Nama Pengirim" value={orderSender.name} onChange={(e) => setOrderSender({...orderSender, name: e.target.value})} className={`w-full p-4 border rounded-2xl outline-none focus:border-[#008f7a] ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200 text-black"}`} />
              <textarea placeholder="Alamat Lengkap" value={orderSender.address} onChange={(e) => setOrderSender({...orderSender, address: e.target.value})} className={`w-full p-4 border rounded-2xl h-32 resize-none outline-none focus:border-[#008f7a] ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200 text-black"}`} />
            </div>
          )}
          {currentStepModal === 2 && (
            <div className={`p-8 border rounded-[2rem] space-y-6 ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
              <div className="flex justify-between items-center"><h3 className={`text-xl font-bold ${isDarkMode?"text-white":"text-black"}`}>Penerima & Paket</h3><button onClick={() => setIsSelectReceiverModalOpen(true)} className="text-[#008f7a] font-bold text-sm hover:underline">Pilih dari Database</button></div>
              <input placeholder="Nama Penerima" value={orderReceiver.name} onChange={(e) => setOrderReceiver({...orderReceiver, name: e.target.value})} className={`w-full p-4 border rounded-2xl outline-none focus:border-[#008f7a] ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200 text-black"}`} />
              <div className="grid grid-cols-2 gap-4">
                 <input placeholder="Barang" value={orderReceiver.item} onChange={(e) => setOrderReceiver({...orderReceiver, item: e.target.value})} className={`p-4 border rounded-2xl outline-none focus:border-[#008f7a] ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200 text-black"}`} />
                 <input placeholder="Berat (kg)" value={orderReceiver.weight} onChange={(e) => setOrderReceiver({...orderReceiver, weight: e.target.value})} className={`p-4 border rounded-2xl outline-none focus:border-[#008f7a] ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200 text-black"}`} />
              </div>
            </div>
          )}
          {currentStepModal === 3 && (
            <div className={`p-8 border rounded-[2rem] text-center space-y-6 ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-teal-50 border-teal-100"}`}>
              <ShieldCheck size={64} className="mx-auto text-[#008f7a]" />
              <h3 className={`text-2xl font-black italic ${isDarkMode ? "text-white" : "text-slate-900"}`}>Konfirmasi Pesanan</h3>
              <div className="text-left space-y-3 font-bold text-sm px-4">
                <div className="flex justify-between text-slate-500"><span>Pengirim:</span><span className={isDarkMode ? "text-white" : "text-slate-900"}>{orderSender.name || "-"}</span></div>
                <div className="flex justify-between text-slate-500"><span>Penerima:</span><span className={isDarkMode ? "text-white" : "text-slate-900"}>{orderReceiver.name || "-"}</span></div>
              </div>
            </div>
          )}
          <div className="flex gap-4">
             {currentStepModal > 1 && <button onClick={() => setCurrentStepModal(currentStepModal - 1)} className={`flex-1 p-4 border rounded-2xl font-bold transition-colors ${isDarkMode ? "text-slate-300 border-slate-600 hover:bg-slate-700" : "text-slate-600 border-slate-300 hover:bg-slate-50"}`}>Kembali</button>}
             <button onClick={handleNextStep} className="flex-1 p-4 bg-[#008f7a] text-white rounded-2xl font-bold shadow-lg hover:bg-teal-700 transition-colors">{currentStepModal === 3 ? 'Selesai & Simpan Data' : 'Lanjutkan'}</button>
          </div>
        </div>
        <div className={`p-8 border rounded-[2rem] h-fit ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
           <h3 className="font-bold mb-6 border-b pb-4 text-slate-400">Ringkasan Tagihan</h3>
           <div className="text-center text-slate-400 italic font-bold">Menunggu Konfirmasi...</div>
        </div>
      </div>
    </div>
  );

  // ========================================================
  // RENDER LAYOUT UTAMA (DASHBOARD & WRAPPER)
  // ========================================================
  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? "bg-slate-900" : "bg-slate-50"} transition-colors duration-300`}>
      {/* Panggil Modal Select dari Part 2 */}
      {isSelectSenderModalOpen && renderSelectModal(true)}
      {isSelectReceiverModalOpen && renderSelectModal(false)}
      
      {/* MODAL ADMIN TAMBAH DATA BARU (SUDAH DISESUAIKAN DGN MYSQL) */}
      {(isAddSenderModalOpen || isAddReceiverModalOpen) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-in fade-in">
          <div className={`bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto ${isDarkMode ? "bg-slate-800 text-white" : "bg-white text-slate-900"}`}>
            <h3 className="text-xl font-black">Form {isAddSenderModalOpen ? "Pengirim" : "Penerima"} Baru</h3>
            <div className="space-y-4">
              <input placeholder="Nama Lengkap" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={`w-full border-b-2 py-3 outline-none font-bold focus:border-[#008f7a] ${isDarkMode ? "bg-transparent border-slate-700 text-white" : "border-slate-100 text-slate-900"}`} />
              <input placeholder="Nomor Telepon" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={`w-full border-b-2 py-3 outline-none font-bold focus:border-[#008f7a] ${isDarkMode ? "bg-transparent border-slate-700 text-white" : "border-slate-100 text-slate-900"}`} />
              <textarea placeholder="Alamat Lengkap" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className={`w-full border-b-2 py-3 outline-none font-bold focus:border-[#008f7a] ${isDarkMode ? "bg-transparent border-slate-700 text-white" : "border-slate-100 text-slate-900"}`} rows={2} />
              
              {/* Tambahan Sesuai MySQL */}
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Kecamatan" value={formData.kecamatan} onChange={(e) => setFormData({...formData, kecamatan: e.target.value})} className={`w-full border-b-2 py-3 outline-none font-bold focus:border-[#008f7a] ${isDarkMode ? "bg-transparent border-slate-700 text-white" : "border-slate-100 text-slate-900"}`} />
                <input placeholder="Kode Pos" value={formData.kode_pos} onChange={(e) => setFormData({...formData, kode_pos: e.target.value})} className={`w-full border-b-2 py-3 outline-none font-bold focus:border-[#008f7a] ${isDarkMode ? "bg-transparent border-slate-700 text-white" : "border-slate-100 text-slate-900"}`} />
              </div>
              
              {isAddSenderModalOpen && (
                <div className="flex items-center gap-2 mt-4 pt-2">
                  <input type="checkbox" id="is_utama" checked={formData.is_utama} onChange={(e) => setFormData({...formData, is_utama: e.target.checked})} className="w-4 h-4 accent-[#008f7a] rounded" />
                  <label htmlFor="is_utama" className="text-sm font-bold opacity-80 cursor-pointer">Jadikan Alamat Utama</label>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 pt-4">
               <button onClick={()=>{setIsAddSenderModalOpen(false);setIsAddReceiverModalOpen(false)}} className="flex-1 py-3 font-bold text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">Batal</button>
               <button onClick={() => handleSaveAdminData(isAddSenderModalOpen ? 'sender' : 'receiver')} className="flex-1 bg-[#008f7a] hover:bg-teal-700 text-white py-3 rounded-xl font-bold shadow-lg transition-colors">Simpan Data</button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR RESPONSIVE */}
      <aside className={`
        fixed inset-y-0 left-0 z-[100] w-64 border-r transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}
      `}>
        <div className="p-8 border-b dark:border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="relative w-8 h-8 bg-white rounded-lg border shadow-sm p-1">
                <Image src="/logo.png" alt="Logo" fill className="object-contain" />
             </div>
             <span className={`font-black text-lg italic tracking-tighter ${isDarkMode ? "text-white" : "text-slate-900"}`}>CargoKu <span className="text-[#008f7a]">Lite</span></span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-400 hover:text-slate-600"><X size={24}/></button>
        </div>
        
        <nav className="flex-1 p-5 space-y-2 overflow-y-auto scrollbar-hide">
          {menuItems.map((m) => (
             <button 
                key={m.id} 
                onClick={() => { setActiveMenu(m.id); setIsMobileMenuOpen(false); }} 
                className={`w-full flex items-center gap-3 p-3.5 rounded-2xl font-bold text-sm transition-all ${activeMenu === m.id ? "bg-[#008f7a] text-white shadow-lg" : (isDarkMode ? "text-slate-400 hover:bg-slate-700 hover:text-white" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900")}`}
             >
                <m.icon size={18} /> {m.label}
             </button>
          ))}
        </nav>
        
        <div className="p-6 border-t border-slate-50 dark:border-slate-700 space-y-3">
           <button onClick={toggleDarkMode} className={`w-full p-3 rounded-2xl flex items-center justify-center gap-2 font-bold text-[10px] uppercase transition-all ${isDarkMode ? "bg-slate-700 text-white hover:bg-slate-600" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />} Tema {isDarkMode ? "Terang" : "Gelap"}
           </button>
           <button onClick={() => { localStorage.clear(); window.location.href="/login"; }} className="w-full p-3 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center gap-2 font-bold text-[10px] uppercase hover:bg-red-100 transition-colors">
              <LogOut size={14} /> Keluar
           </button>
        </div>
      </aside>

      {/* OVERLAY MOBILE BACKGROUND */}
      {isMobileMenuOpen && (
         <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden animate-in fade-in"></div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden w-full relative">
        <header className={`h-16 border-b flex items-center justify-between md:justify-end px-6 md:px-10 shrink-0 z-10 ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}>
           <button onClick={() => setIsMobileMenuOpen(true)} className={`md:hidden p-2 rounded-xl transition-colors ${isDarkMode ? "bg-slate-700 text-slate-300 hover:bg-slate-600" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}>
              <Menu size={20}/>
           </button>
           <div className="flex items-center gap-4 md:gap-6">
              <div className="text-right hidden sm:block">
                 <p className={`text-xs font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>{userRole === "Admin" ? "Administrator" : userProfile.nama}</p>
                 <p className="text-[9px] opacity-80 font-bold uppercase text-[#008f7a]">{userRole}</p>
              </div>
              <div className="w-10 h-10 bg-[#008f7a] rounded-[14px] flex items-center justify-center text-white font-black text-lg shadow-md">
                 {userRole === "Admin" ? "A" : (userProfile.nama ? userProfile.nama.charAt(0).toUpperCase() : "P")}
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-hide">
           {activeMenu === "dashboard" && renderDashboard()}
           {activeMenu === "pesanan" && renderPesanan()}
           
           {/* Modul Pelanggan */}
           {userRole === "Pelanggan" && activeMenu === "cek-ongkir" && renderCekOngkir()}
           {userRole === "Pelanggan" && activeMenu === "pengaturan" && renderPengaturan()}
           
           {/* Modul Admin */}
           {userRole === "Admin" && activeMenu === "pengirim" && renderDatabase(true)}
           {userRole === "Admin" && activeMenu === "penerima" && renderDatabase(false)}
           {userRole === "Admin" && activeMenu === "buat-pesanan" && renderBuatPesanan()}
        </div>
      </main>

    </div>
  );
}