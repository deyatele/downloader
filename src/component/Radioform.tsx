import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RadioForm, {RadioButtonInput} from 'react-native-simple-radio-button';
import {ILinksOptionsDateName, IOptionsDate} from '../interface';

interface Props {
  optionsD: IOptionsDate;
  onPressRadioForm: (val: ILinksOptionsDateName, key: string) => void;
}

export const RadioFormView = ({optionsD, onPressRadioForm}: Props) => {
  return (
    <RadioForm animation={true} style={styles.radioFormStyle}>
      {optionsD.links &&
        Object.keys(optionsD.links).map(key => {
          if (!optionsD.links) {
            return null;
          }
          return (
            <View key={key} style={styles.viewCard}>
              <Text>Файл {key}</Text>
              {Object.keys(optionsD.links[key]).map((val, i) => {
                if (!optionsD.links) {
                  return null;
                }
                return (
                  <View
                    key={`${optionsD.links[key][val].q}${optionsD.links[key][val].f}`}
                    style={styles.cardOptions}>
                    <View style={styles.viewOptions}>
                      <Text style={styles.textOptions}>
                        Качество: {optionsD.links[key][val].q}
                      </Text>
                      <Text style={styles.textOptions}>
                        Размер: {optionsD.links[key][val].size}
                      </Text>
                    </View>
                    <RadioButtonInput
                      obj={optionsD.links[key][val]}
                      index={i}
                      isSelected={!!optionsD.links[key][val].selected}
                      onPress={() => {
                        if (optionsD.links) {
                          return onPressRadioForm(
                            optionsD.links[key][val],
                            val,
                          );
                        }
                        return;
                      }}
                    />
                  </View>
                );
              })}
            </View>
          );
        })}
    </RadioForm>
  );
};

const styles = StyleSheet.create({
  cardOptions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  viewOptions: {marginRight: 10},
  textOptions: {fontSize: 10},
  radioFormStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  viewCard: {
    margin: 10,
    borderColor: '#f23c74',
    borderWidth: 2,
    padding: 10,
    minWidth: 160,
  },
});
