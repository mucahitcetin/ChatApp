import React, { useEffect, useState, useRef } from "react";
import {
  addDoc,
  serverTimestamp,
  onSnapshot,
  collection,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import Message from "../components/Message";

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);
  const lastMsg = useRef();

  // mesaj gönderme fonksiyonu
  const sendMessage = async (e) => {
    e.preventDefault();

    // kolleksiyonun referansını alma
    const messagesCol = collection(db, "messages");

    // kolleksiyona yeni döküman ekle
    await addDoc(messagesCol, {
      text: e.target[0].value.trim(),
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });

    // inputu temizle
    e.target.reset();
  };

  // mevcut odada gönderilen mesajları anlık olarak al
  useEffect(() => {
    // abone olunacak kolleksiyonun referansını al
    const messagesCol = collection(db, "messages");

    //verileri çekerken kullanılacak sorguyu oluştur
    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    // onSnapshot anlık olarak kolleksiyondaki  değişimleri izler kolleksiyon her değiştiğinde veridğimmiz fonksiyon ile kolleksiyondaki güncel dökümanlara erişiriz
    const unsub = onSnapshot(q, (snapshot) => {
      // veirlerin geçici olarak tutulduğu dizi
      const tempMsg = [];

      // dökümanları dön , verilerine eriş
      snapshot.forEach((doc) => tempMsg.push(doc.data()));

      // mesajları state'e aktar
      setMessages(tempMsg);

      //kullanıcının sohbet sayfasından ayrılma anında aboneliği durdur
      return () => {
        unsub();
      };
    });
  }, []);

  // yeni mesaj gönderilme olayını izle
  useEffect(() => {
    lastMsg.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>
      <main>
        {messages.length > 0 ? (
          <>
            {messages.map((data, i) => (
              <Message data={data} key={i} />
            ))}
            <div ref={lastMsg} />
          </>
        ) : (
          <p className="warn">
            Henüz hiç mesaj gönderilmedi. İlk mesajı siz gönderiniz.
          </p>
        )}
      </main>

      <form onSubmit={sendMessage}>
        <input placeholder="mesajınızı yazınız..." type="text" required />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
