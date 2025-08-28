import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Switch,
  Pressable,
  Image,
} from "react-native";

type Room = {
  id: number;
  name: string;
  description?: string;
  cleaned: boolean;
};

export default function Rooms({ navigation }: any) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const mockRooms: Room[] = [
      { id: 1, name: "Sala de Reuniões", description: "Para reuniões internas", cleaned: false },
      { id: 2, name: "Laboratório de Informática", description: "Computadores e equipamentos", cleaned: true },
      { id: 3, name: "Auditório", description: "Espaço para palestras e treinamentos", cleaned: false },
      { id: 4, name: "Sala de Coordenação", description: "Equipe administrativa", cleaned: true },
      { id: 5, name: "Sala de Arquivo", description: "Documentos e pastas", cleaned: false },
    ];
    setRooms(mockRooms);
  }, []);

  const openRoomModal = (room: Room) => {
    setSelectedRoom(room);
    setModalVisible(true);
  };

  const toggleCleaned = (id: number) => {
    setRooms(prev =>
      prev.map(room => (room.id === id ? { ...room, cleaned: !room.cleaned } : room))
    );
    if (selectedRoom) {
      setSelectedRoom({ ...selectedRoom, cleaned: !selectedRoom.cleaned });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header com título e botão de perfil */}
      <View style={styles.header}>
        <Text style={styles.title}>Salas Disponíveis</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image
            source={{ uri: "https://img.icons8.com/ios-filled/50/ffffff/user-male-circle.png" }}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={rooms}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.roomCard}
            onPress={() => openRoomModal(item)}
          >
            <Text style={styles.roomName}>{item.name}</Text>
            {item.cleaned && <Text style={styles.cleanedLabel}>✅ Limpa</Text>}
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Modal da sala */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedRoom && (
              <>
                <Text style={styles.modalTitle}>{selectedRoom.name}</Text>
                {selectedRoom.description && (
                  <Text style={styles.modalDesc}>{selectedRoom.description}</Text>
                )}
                <View style={styles.switchContainer}>
                  <Text>Limpa?</Text>
                  <Switch
                    value={selectedRoom.cleaned}
                    onValueChange={() => toggleCleaned(selectedRoom.id)}
                  />
                </View>

                <Pressable
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeText}>Fechar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 20 },
  
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  title: { 
    fontSize: 22, 
    fontWeight: "bold" 
  },

  profileButton: { 
    padding: 5,
    backgroundColor: "#004A8D",
    borderRadius: 15,
  },

  profileIcon: { 
    width: 30, 
    height: 30, 
    borderRadius: 15 
  },

  roomCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  roomName: { fontSize: 18, fontWeight: "600" },
  cleanedLabel: { fontSize: 16, color: "green", fontWeight: "bold" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  modalDesc: { fontSize: 16, marginBottom: 20 },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: "center",
    backgroundColor: "#004A8D",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  closeText: { color: "#fff", fontWeight: "bold" },
});
