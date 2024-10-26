import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {timeConvert} from '../lib/timeConvert';
import {StyleSheet} from 'react-native';
import {
  ILinksOptionsDateArray,
  ILinksOptionsDateName,
  IOptionsDate,
} from '../interface';
import {COLOR_BTN} from '../constants';
import {Select} from './Select';
import {API_URL_IMAGE} from '../../env';

export const Preview = ({
  optionsD,
}: {
  optionsD: IOptionsDate | null | undefined;
}) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectQuality, setSelectQuality] = React.useState<
    ILinksOptionsDateName | undefined
  >();

  const data: ILinksOptionsDateArray[] = [];
  if (optionsD && optionsD.links) {
    const links = optionsD.links;
    Object.keys(links).forEach(item => {
      const arr: ILinksOptionsDateName[] = [];
      Object.keys(links[item]).forEach(key => {
        if (!selectQuality && links[item][key].selected) {
          links[item][key].selected = true;

          setSelectQuality(links[item][key]);
        }
        links[item][key].selected = false;
        arr.push(links[item][key]);
      });
      data.push({[item]: arr});
    });
  }
  return (
    <View style={styles.descriptionContainer}>
      {optionsD?.vid && (
        <Image
          source={{uri: `${API_URL_IMAGE}${optionsD.vid}/0.jpg`}}
          style={styles.imageStyle}
        />
      )}

      <View style={styles.description}>
        <Text style={styles.textDescription}>Название: {optionsD?.title}</Text>
        <Text style={styles.textDescription}>
          Продолжительность: {timeConvert(optionsD?.t ?? 0)}
        </Text>
        <TouchableOpacity
          style={styles.checkButton}
          onPress={() => setIsModalVisible(true)}>
          <Text style={styles.textButton}>
            Файл:{' '}
            {selectQuality
              ? `${selectQuality.f} (${selectQuality.q}) - ${selectQuality.size}`
              : 'Не выбрано'}
          </Text>
        </TouchableOpacity>
        <Select
          setIsModalVisible={setIsModalVisible}
          links={data}
          isModalVisible={isModalVisible}
          setSelectQuality={setSelectQuality}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 60,
    width: 100,
    borderRadius: 5,
  },
  descriptionContainer: {
    display: 'flex',
    position: 'relative',
    gap: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBlockColor: '#f23c74',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    zIndex: 1,
  },
  description: {
    flexShrink: 1,
  },
  textDescription: {
    fontSize: 14,
  },
  checkButton: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 250,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: COLOR_BTN,
    marginTop: 5,
    marginBottom: 5,
  },
  textButton: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
