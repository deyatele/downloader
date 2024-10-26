import React, {Dispatch, SetStateAction} from 'react';
import {
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {ILinksOptionsDateArray, ILinksOptionsDateName} from '../interface';

export const Select = ({
  isModalVisible,
  setIsModalVisible,
  links,
  setSelectQuality,
}: {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isModalVisible: boolean;
  links: ILinksOptionsDateArray[];
  setSelectQuality: Dispatch<SetStateAction<ILinksOptionsDateName | undefined>>;
}) => {
  return (
    <Modal visible={isModalVisible} animationType="slide">
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <Text style={styles.text}>Закрыть</Text>
          </TouchableOpacity>
          <ScrollView>
            <View style={styles.line}>
              {links?.map((item, i) => (
                <View key={i}>
                  <Text>{Object.keys(item)[0]}</Text>

                  {item[Object.keys(item)[0]].map((item2, i2) => (
                    <View key={i2} style={styles.card}>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectQuality(item2);
                          setIsModalVisible(false);
                        }}>
                        <Text>Качество: {item2.q}</Text>
                        <Text>Размер: {item2.size}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    fontSize: 20,
    padding: 10,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 300,
    minWidth: 300,
    alignItems: 'center',
    borderColor: '#f23c74',
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#333333',
    gap: 10,
  },
  text: {color: 'white', fontSize: 20, fontWeight: 'bold'},
  card: {margin: 10, borderColor: '#f23c74', borderWidth: 2, padding: 10},

  line: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
