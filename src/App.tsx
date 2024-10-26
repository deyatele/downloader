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
  TouchableOpacity,
  View,
} from 'react-native';
import {IOptionsDate, IQuessionDownload} from './interface';
import {findSelectedOption} from './lib/findSelectedOption';
import {findDubleSelected} from './lib/findDubleSelected';
import {getOptions} from './api/getOptions';
import {getDataLink} from './api/getDataLink';
import {getDownLoadLink} from './api/getDownLoadLink';
import {WSCheckStatus} from './lib/WSCheckStatus';
import {
  COLOR_BTN,
  ERR_TXT_MESSAGE,
  TXT_ERROR_403,
  TXT_ERROR_404,
  TXT_ERROR_500,
} from './constants';
import {checkLink} from './lib/checkLink';
import {getDataLinks} from './api/getDataLinks';
import {Preview} from './component/Preview';

function App(): JSX.Element {
  const [inputValue, setInputValue] = useState(
    'https://youtu.be/Wo2TwPi3cNs?si=pneW87DsR_MZqzVo',
  );
  const [optionsD, setOptionsD] = useState<IOptionsDate | null | undefined>(
    null,
  );
  const [convertingValue, setConvertingValue] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState('');
  const [optionsForLink, setOptionsForLink] =
    useState<IQuessionDownload | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // const onPressRadioForm = (val: ILinksOptionsDateName, key: string) => {
  //   setResultUrl('');
  //   setOptionsD(prev => {
  //     if (!prev || !prev?.links) {
  //       return prev;
  //     }
  //     const newOption = {...prev};
  //     if (!newOption.links) {
  //       return;
  //     }
  //     Object.keys(newOption.links).forEach(k => {
  //       Object.keys(newOption.links![k]).forEach(name => {
  //         if (k === val.f && name === key) {
  //           newOption.links![k][name].selected = true;
  //           return;
  //         }
  //         newOption.links![k][name].selected = null;
  //       });
  //     });

  //     return newOption;
  //   });
  //   selectedValue(val, setOptionsForLink);
  // };
  const getOptionsValue = (data: IOptionsDate) => {
    try {
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
        setOptionsForLink(prev => ({...prev, ...dataForLink}));
        setOptionsD(data);
      }
    } catch (error) {
      setIsLoading(false);
      setOptionsD(TXT_ERROR_500);
    }
  };
  const pressDownload = async () => {
    if (!inputValue) {
      return setOptionsD(ERR_TXT_MESSAGE);
    }
    setOptionsD(null);
    setResultUrl('');
    setIsLoading(true);
    const checkValue = await checkLink(inputValue);
    if (checkValue === null) {
      setIsLoading(false);
      return setOptionsD(TXT_ERROR_500);
    }
    if (typeof checkValue === 'object') {
      const dataArr: IOptionsDate[] = [];

      checkValue.contents.forEach(async item => {
        const data = await getDataLinks(
          `https://youtu.be/${item.playlistVideoRenderer.videoId}`,
        );
        if (data) {
          dataArr.push(data);
        }
        if (!data) {
          return setOptionsD(TXT_ERROR_403);
        }
      });
    }

    if (typeof checkValue === 'string') {
      const data = await getOptions(inputValue);
      setIsLoading(false);
      getOptionsValue(data);
      if (!data) {
        return setOptionsD(TXT_ERROR_500);
      }
      return data;
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
              <Text style={styles.inputClearText}>Х</Text>
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
            <Preview optionsD={optionsD} />

            {/* <View style={styles.viewErrorMess}>
              {
                optionsD.mess ? (
                  <Text style={styles.textErrorMess}>{optionsD.mess}</Text>
                ) : null
                // <RadioFormView
                //   optionsD={optionsD}
                //   onPressRadioForm={onPressRadioForm}
                // />
              }
            </View> */}
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
    position: 'relative',
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
    width: 170,
    height: 80,
    borderRadius: 10,
  },
});

export default App;
