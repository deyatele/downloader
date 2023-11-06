import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  IOptionsDate,
  ILinksOptionsDateName,
  IQuessionDownload,
} from './optionsDownload';
import {RadioFormView} from './component/Radioform';
import {findSelectedOption} from './lib/findSelectedOption';
import {findDubleSelected} from './lib/findDubleSelected';
import {getOptions} from './api/getOptions';
import {getLinkDownload} from './api/getLinkDownload';

function App(): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [optionsD, setOptionsD] = useState<IOptionsDate>();
  const [resultUrl, setResultUrl] = useState('');
  const [optionsForLink, setOptionsForLink] = useState<IQuessionDownload>();
  const [isLoading, setIsLoading] = useState(false);

  const colorBtn = '#4b8e2e';

  const onPressRadioForm = (val: ILinksOptionsDateName, key: string) => {
    setResultUrl('');
    setOptionsD(prev => {
      if (!prev?.links) {
        return prev;
      }
      const newOption = {...prev};
      if (!newOption.links) {
        return;
      }
      Object.keys(newOption.links).forEach(k => {
        Object.keys(newOption.links![k]).forEach(name => {
          if (k === val.f && name === key) {
            newOption.links![k][name].selected = true;
            return;
          }
          newOption.links![k][name].selected = null;
        });
      });

      return {...prev, ...newOption};
    });
    selectedValue(val);
  };

  const selectedValue = (value: ILinksOptionsDateName) => {
    setOptionsForLink(prev => {
      if (prev) {
        return {...prev, fquality: value.k, ftype: value.f};
      }
      return prev;
    });
  };

  const pressDownload = async () => {
    setOptionsD(undefined);
    setResultUrl('');
    setIsLoading(true);
    try {
      const data = await getOptions(inputValue);
      setIsLoading(false);
      if (data.mess) {
        return setOptionsD(data);
      }
      if (data.links) {
        findDubleSelected(data.links);
      }
      setOptionsD(data);
      if (data && data?.links) {
        const {f, k} = findSelectedOption(data.links);
        const dataForLink: IQuessionDownload = {
          fname: data.fn || '',
          fquality: k,
          ftype: f,
          timeExpire: data.timeExpires || '',
          token: data.token || '',
          v_id: data.vid || '',
        };
        setOptionsForLink(prev => ({...prev, ...dataForLink}));
      }
    } catch (error) {
      setIsLoading(false);
      setOptionsD({
        mess: 'Что-то пошло не так. Попробуйте еще.',
        status: 'error',
      });
    }
  };

  const pressLinkDownload = async () => {
    try {
      if (optionsForLink) {
        setIsLoading(true);
        const data = await getLinkDownload(optionsForLink);
        setIsLoading(false);
        setResultUrl(data.result);
        return;
      }
      setOptionsD({
        mess: 'Что-то пошло не так! Попробуйте еще раз нажать на кнопку загрузить или проверьте адрес ссылки.',
        status: 'error',
      });
    } catch (error) {
      setIsLoading(false);
      setOptionsD({
        mess: 'Что-то пошло не так! Попробуйте еще раз нажать на кнопку загрузить или проверьте адрес ссылки.',
        status: 'error',
      });
    }
  };

  return (
    <SafeAreaView style={styles.aria}>
      <StatusBar />
      {isLoading && (
        <View style={styles.louding}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
      <ScrollView>
        <Text style={styles.textHeader}>Загрузка видео с Youtube</Text>
        <TextInput
          style={styles.input}
          onChangeText={setInputValue}
          value={inputValue}
          placeholder="Вставте ссылку Youtube"
        />
        <View style={styles.button}>
          <Button onPress={pressDownload} title="Загрузить" color={colorBtn} />
        </View>
        {optionsD && (
          <>
            <View style={styles.viewErrorMess}>
              {optionsD.mess ? (
                <Text style={styles.textErrorMess}>{optionsD.mess}</Text>
              ) : (
                <RadioFormView
                  optionsD={optionsD}
                  onPressRadioForm={onPressRadioForm}
                />
              )}
            </View>
            {!optionsD.mess ? (
              resultUrl ? (
                <View style={styles.button}>
                  <Button
                    onPress={() => Linking.openURL(resultUrl)}
                    title="Скачать"
                    color={colorBtn}
                  />
                </View>
              ) : (
                <View style={styles.button}>
                  <Button
                    onPress={pressLinkDownload}
                    title="Получить"
                    color={colorBtn}
                  />
                </View>
              )
            ) : null}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  aria: {
    flex: 1,
    backgroundColor: '#333333',
  },
  louding: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#555555',
    zIndex: 10,
    opacity: 0.5,
  },
  textHeader: {
    fontSize: 18,
    alignSelf: 'center',
    marginVertical: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#f23c74',
  },
  button: {
    width: '50%',
    alignSelf: 'center',
    margin: 30,
  },
  viewErrorMess: {justifyContent: 'center', alignItems: 'center'},
  textErrorMess: {textAlign: 'center', padding: 30},
});

export default App;
