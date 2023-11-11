import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IOptionsDate,
  ILinksOptionsDateName,
  IQuessionDownload,
} from './interface';
import {RadioFormView} from './component/Radioform';
import {findSelectedOption} from './lib/findSelectedOption';
import {findDubleSelected} from './lib/findDubleSelected';
import {getOptions} from './api/getOptions';
import {getDataLink} from './api/getDataLink';
import {getDownLoadLink} from './api/getDownLoadLink';
import {WSCheckStatus} from './lib/WSCheckStatus';
import {selectedValue} from './lib/selectedValue';
import {
  COLOR_BTN,
  ERR_TXT_MESSAGE,
  TXT_ERROR_404,
  TXT_ERROR_500,
} from './constants';
import {API_URL_IMAGE} from '../env';
import {timeConvert} from './lib/timeConvert';

function App(): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [optionsD, setOptionsD] = useState<IOptionsDate | null | undefined>(
    null,
  );
  const [convertingValue, setConvertingValue] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState('');
  const [optionsForLink, setOptionsForLink] =
    useState<IQuessionDownload | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');

  const onPressRadioForm = (val: ILinksOptionsDateName, key: string) => {
    setResultUrl('');
    setOptionsD(prev => {
      if (!prev || !prev?.links) {
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

      return newOption;
    });
    selectedValue(val, setOptionsForLink);
  };
  const pressDownload = async () => {
    if (!inputValue) {
      return setOptionsD(ERR_TXT_MESSAGE);
    }
    setOptionsD(null);
    setResultUrl('');
    setIsLoading(true);
    setImage('');
    try {
      const data = await getOptions(inputValue);

      setIsLoading(false);
      if (!data) {
        return setOptionsD(TXT_ERROR_500);
      }
      if (data.mess) {
        return setOptionsD(data);
      }
      if (data.links) {
        findDubleSelected(data.links);
        const {f = '', k = ''} = findSelectedOption(data.links);
        const dataForLink: IQuessionDownload = {
          fname: data.fn || '',
          fquality: k || '',
          ftype: f || '',
          timeExpire: data.timeExpires || '',
          token: data.token || '',
          v_id: data.vid || '',
        };
        setImage(`${API_URL_IMAGE}${data.vid}/0.jpg`);
        setOptionsForLink(prev => ({...prev, ...dataForLink}));
        setOptionsD(data);
      }
    } catch (error) {
      setImage('');
      setIsLoading(false);
      setOptionsD(TXT_ERROR_500);
    }
  };

  const pressLinkDownload = async () => {
    try {
      if (!optionsForLink) {
        return setOptionsD(TXT_ERROR_500);
      }

      setIsLoading(true);
      const data = await getDataLink(optionsForLink);
      if (!('c_status' in data)) {
        return setOptionsD(TXT_ERROR_500);
      }

      if ('d_url' in data && data.d_url) {
        return setResultUrl(data.d_url);
      }

      if (data.c_status === 'ok' && data.c_server) {
        const responseData = await getDownLoadLink(
          data.c_server,
          optionsForLink,
        );

        if (!responseData) {
          return setOptionsD(TXT_ERROR_404);
        }

        if (
          responseData.status === 'success' &&
          responseData.statusCode === 200
        ) {
          return setResultUrl(responseData.result);
        }

        if (
          responseData.status === 'success' &&
          responseData.statusCode === 300 &&
          responseData.jobId
        ) {
          setConvertingValue('0');
          WSCheckStatus(
            data.c_server,
            responseData.jobId,
            setResultUrl,
            setConvertingValue,
            (e: React.SetStateAction<IOptionsDate | null | undefined>) => {
              setOptionsD(e);
              setImage('');
            },
          );
          return;
        }
        setImage('');
        setOptionsD(TXT_ERROR_404);
      }

      setOptionsD(TXT_ERROR_500);
      setIsLoading(false);
      setConvertingValue(null);
      return;
    } catch (error) {
      setImage('');
      setOptionsD(TXT_ERROR_500);
      setConvertingValue(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.aria}>
      <StatusBar />
      {convertingValue && (
        <View style={styles.louding}>
          <ActivityIndicator size={'large'} />
          <Text>Converting... {convertingValue}</Text>
        </View>
      )}
      {isLoading && (
        <View style={styles.louding}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
      <ScrollView>
        <Text style={styles.textHeader}>Загрузка видео с Youtube</Text>

        {/* INPUT SEARCH */}
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setInputValue}
            value={inputValue}
            placeholder="Вставте ссылку Youtube"
          />
          {inputValue && (
            <TouchableOpacity
              style={styles.inputClear}
              onPress={() => setInputValue('')}>
              <View>
                <Text style={styles.inputClearText}>Х</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* DOWNLOAD BUTTON */}
        <View style={styles.button}>
          <Button onPress={pressDownload} title="Загрузить" color={COLOR_BTN} />
        </View>

        {/* CHECKBOX */}
        {optionsD && (
          <>
            {/* PREVIEW */}
            {image && (
              <View style={styles.descriptionContainer}>
                <Image source={{uri: image}} style={styles.imageStyle} />

                <View style={styles.description}>
                  <Text style={styles.textDescription}>
                    Название: {optionsD.title}
                  </Text>
                  <Text style={styles.textDescription}>
                    Продолжительность:{' '}
                    {timeConvert(optionsD.t ? optionsD.t : 0)}
                  </Text>
                </View>
              </View>
            )}
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
                    color={COLOR_BTN}
                  />
                </View>
              ) : (
                <View style={styles.button}>
                  <Button
                    onPress={pressLinkDownload}
                    title="Получить"
                    color={COLOR_BTN}
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
  inputView: {
    position: 'relative',
  },
  inputClear: {
    position: 'absolute',
    end: '5%',
    top: '28%',
  },
  inputClearText: {fontSize: 20},
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
    paddingRight: 30,
    borderRadius: 10,
  },
  button: {
    width: '50%',
    alignSelf: 'center',
    margin: 30,
  },
  viewErrorMess: {justifyContent: 'center', alignItems: 'center'},
  textErrorMess: {textAlign: 'center', padding: 30},
  imageStyle: {
    width: 180,
    height: 100,
    borderRadius: 10,
  },
  descriptionContainer: {
    display: 'flex',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  description: {
    display: 'flex',
    overflow: 'hidden',
    width: 200,
  },
  textDescription: {
    fontSize: 12,
  },
});

export default App;
