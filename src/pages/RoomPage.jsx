import React from "react";

const RoomPage = ({ setIsAuth, setRoom }) => {
  const logout = () => {
    // yetki state'ini false'a çek
    setIsAuth(false);

    // localdeki kaydı kaldır
    localStorage.removeItem("token");
  };

  // form gönderilince
  const handleSubmit = (e) => {
    // sayfa yenilemeyi engelle
    e.preventDefault();

    // inputtaki değeri al
    const room = e.target[0].value.trim().toLowerCase();

    // oda ismini state'e aktar
    setRoom(room);
  };
  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Odası</h1>
      <p>Hangi Odaya Gireceksiniz</p>

      <input placeholder="ör:haftaiçi" type="text" required />

      <button type="submit">Odaya Gir</button>
      <button onClick={logout} type="button">
        Çıkış Yap
      </button>
    </form>
  );
};

export default RoomPage;
