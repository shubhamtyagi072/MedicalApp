/* @flow */

import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, Image, Modal, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { StackActions, NavigationActions } from "react-navigation";
import styles from "./styles";
import TextCommon from "../../../Common/TextCommon";
import RoundedButton from "../../../Common/RoundedButton";
import global from "../../../Common/global";
import TextinputCommon from "../../../Common/TextinputCommon";
import LoadingScreen from "../../../Common/LoadingScreen";
import { constant } from "./constant";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { registerApi } from "../../../../Actions/registerAction";
import RNPickerSelect from "react-native-picker-select";
import DatePicker from "react-native-datepicker";
import storage from "../../../../utils/storage";
import BackButton from "../../../../common/BackButton";
import moment from "moment";
import initIO from "../../../../Actions/initIO";

class DoctorRegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      cnf_password: "",
      dob: "",
      pod: "",
      date: null,
      acceptTerms: true,
      isLoading: false,
      showDate: true,
      showPP: false,
      specialization: null,
      specialization_info: null,
    };
  }

  componentDidMount() {}

  onNextPress = async (type) => {
    if (this.validation()) {
      this.setState({ isLoading: true });
      var data = {
        name: this.state.name,
        sur_name: this.state.pod,
        email: this.state.email,
        validated: false,
        password: this.state.password,
        privacy_policy: this.state.acceptTerms,
        gender: "",
        age: "",
        birth_date: this.state.date,
        specialization: this.state.specialization,
        specialization_info: this.state.specialization_info,
        address: "",
        city: "",
        height: 100,
        weight: 100,
        life_style: "",
      };
      var _temp = "";
      if (type == "MEDICO") {
        _temp = "doctor";
      } else {
        _temp = "patient";
      }
      console.log("call123");
      let response = await registerApi(data, _temp);
      console.log("resgere", response["status"]);
      if (response) {
        this.setState({ isLoading: false });

        if (response["status"] == "success") {
          response.user = response.doctor;

          const payload = JSON.stringify(response);
          const doctor = response.doctor || response.user;

          await storage.set("Login", payload);
          this.props.initIO({ id: doctor.id, isDoctor: true }, this.props.navigation);

          Alert.alert("Medico", response["message"], [
            {
              text: "OK",
              onPress: () => {
                this.props.navigation.navigate("DoctorRegisterConfirmScreen");
              },
            },
          ]);
        } else {
          Alert.alert("Errore", response.errors[0].msg, [
            {
              text: "OK",
              onPress: () => {},
            },
          ]);
        }
      }
    }
  };

  //validation check for the values in the  input fields
  validation = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log("call");
    if (!this.state.name) {
      console.log("1");
      alert(constant.errName);
      return false;
    } else if (!this.state.date) {
      console.log("2");
      alert("Inserire una data valida");
      return false;
    } else if (reg.test(this.state.email) == false) {
      alert(constant.errEmail);
      return false;
    } else if (!this.state.password) {
      alert(constant.errPassword);
      return false;
    } else if (this.state.password.length < 6) {
      alert(constant.errValidPassword);
      return false;
    } else if (!(this.state.password === this.state.cnf_password)) {
      alert(constant.errCnfPass);
      return false;
    } else if (!this.state.acceptTerms) {
      console.log("3");
      alert("Devi accettare i termini e le condizioni");
      return false;
    } else {
      return true;
    }
  };

  //input field value changing monitor
  onNameChangeTxt = (value) => {
    this.setState({
      name: value,
    });
  };
  onPodChangeTxt = (value) => {
    this.setState({
      pod: value,
    });
  };

  onEmailChangeTxt = (value) => {
    this.setState({
      email: value,
    });
  };

  onPassChangeTxt = (value) => {
    this.setState({
      password: value,
    });
  };

  onDobChangeTxt = (value) => {
    this.setState({
      dob: value,
    });
  };

  onCnfPassChangeTxt = (value) => {
    this.setState({
      cnf_password: value,
    });
  };

  setSpecialist = async (value) => {
    this.setState({
        specialization :  value
    })
  };

  setSpecialization = async (value) => {
    this.setState({
        specialization_info : value
    })
  };

  openPP = () => {
    this.setState({
      showPP: true,
    });
  };

  render() {
    const type = this.props.navigation.state.params.type;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <BackButton navigation={this.props.navigation} />

        <Modal animationType="slide" transparent={true} visible={this.state.showPP}>
          <View style={styles.modalMainView}>
            <View style={styles.insideMainView}>
              <View>
                <Entypo
                  style={{ alignSelf: "flex-end" }}
                  name="cross"
                  onPress={() => {
                    this.setState({ showPP: false });
                  }}
                  size={40}
                  color={global.white}
                />
              </View>

              <ScrollView>
                <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                  <Text style={styles.BigregularTxt}>
                    Privacy Policy della App di Telemedicina<Text style={styles.bigBoldTxt}>il mio medico in rete</Text>
                  </Text>
                  <Text style={styles.BigregularTxt}>Questa Applicazione raccoglie alcuni Dati Personali dei propri Utenti.</Text>
                  <Text style={styles.BigregularTxt}>Questo documento pu?? essere stampato utilizzando il comando di stampa presente nelle impostazioni di qualsiasi browser.</Text>

                  <Text style={[styles.bigBoldTxt, { alignSelf: "center", marginTop: 10 }]}>Riassunto della policy</Text>
                  <Text style={[styles.bigBoldTxt, { alignSelf: "center", marginTop: 10, fontSize: 16 }]}>Dati personali raccolti per le seguenti finalit?? ed utilizzando i seguenti servizi:</Text>
                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]}>o Gestione dei dati di attivit??</Text>
                  <Text style={styles.BigregularTxt}>Apple HealthKit</Text>
                  <Text style={styles.BigregularTxt}>Dati Personali: sesso, et??, altezza, peso, battito cardiaco ed altri dati vitali</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]}>o Registrazione ed autenticazione fornite direttamente da questa Applicazione</Text>
                  <Text style={styles.BigregularTxt}>Registrazione diretta</Text>
                  <Text style={styles.BigregularTxt}>Dati Personali: nome e cognome, sesso, email</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10 }]}>Ulteriori informazioni sui Dati Personali</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]}>o Notifiche push</Text>
                  <Text style={styles.BigregularTxt}>Questa Applicazione pu?? inviare notifiche push all'Utente per raggiungere gli scopi descritti nella presente privacy policy.</Text>
                  <Text style={styles.BigregularTxt}>Nella maggior parte dei casi, gli Utenti possono scegliere di non ricevere notifiche push consultando le impostazioni del proprio dispositivo, come le impostazioni di notifica per i telefoni cellulari, e modificando quindi tali impostazioni per questa Applicazione, per alcune o per tutte le applicazioni presenti sul dispositivo in questione.</Text>
                  <Text style={styles.BigregularTxt}>Gli Utenti devono essere consapevoli che la disabilitazione delle notifiche push pu?? influire negativamente sull'utilizzo di questa Applicazione.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]}>o Analisi dei Dati dell???Utente e previsioni (???profilazione???)</Text>
                  <Text style={styles.BigregularTxt}>Il Titolare potrebbe trattare i dati d???utilizzo raccolti attraverso questa Applicazione per creare o aggiornare profili di utenza. Questo tipo di trattamento consente al Titolare di valutare scelte, preferenze e comportamento dell???Utente per gli scopi specificati nelle rispettive sezioni di questo documento.</Text>
                  <Text style={styles.BigregularTxt}>I profili d???utenza possono essere creati anche grazie a strumenti automatizzati, come algoritmi, che possono anche essere offerti da terze parti. Per ottenere ulteriori informazioni sull???attivit?? di profilazione l???Utente pu?? fare riferimento alle rispettive sezioni di questo documento.</Text>
                  <Text style={styles.BigregularTxt}>L???Utente ha in ogni momento diritto ad opporsi a tale attivit?? di profilazione. Per scoprire di pi?? sui diritti dell???Utente e su come esercitarli, l???Utente pu?? fare riferimento alla sezione di questo documento relativa ai diritti degli Utenti.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10 }]}>Informazioni di contattoInformazioni di contatto</Text>
                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]}>o Titolare del Trattamento dei Dati</Text>
                  <Text style={styles.BigregularTxt}>Med Stage Srl, Via Gioacchino Rossini 10 - 20062 Cassano d'Adda (MI)</Text>
                  <Text style={styles.BigregularTxt}>
                    <Text style={styles.bigBoldTxt}>Indirizzo email del Titolare:</Text> info@medstage.it
                  </Text>

                  <Text style={[styles.bigBoldTxt, { alignSelf: "center", marginTop: 10 }]}>Policy completa</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]}>o Titolare del Trattamento dei Dati</Text>
                  <Text style={styles.BigregularTxt}>Med Stage Srl, Via Coluccio Salutati 7 - 20144 Milano</Text>
                  <Text style={styles.BigregularTxt}>
                    <Text style={styles.bigBoldTxt}>Indirizzo email del Titolare:</Text>info@medstage.it
                  </Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]}>Dati raccolti</Text>
                  <Text style={styles.BigregularTxt}>Fra i Dati Personali raccolti da questa Applicazione, in modo autonomo o tramite terze parti, ci sono: nome; cognome; sesso; email; data di nascita; altezza, peso; battito cardiaco ed altri dati vitali.</Text>
                  <Text style={styles.BigregularTxt}>Dettagli completi su ciascuna tipologia di dati raccolti sono forniti nelle sezioni dedicate di questa privacy policy o mediante specifici testi informativi visualizzati prima della raccolta dei dati stessi.</Text>
                  <Text style={styles.BigregularTxt}>I Dati Personali possono essere liberamente forniti dall'Utente o, nel caso di Dati di Utilizzo, raccolti automaticamente durante l'uso di questa Applicazione.</Text>
                  <Text style={styles.BigregularTxt}>Se non diversamente specificato, tutti i Dati richiesti da questa Applicazione sono obbligatori. Se l???Utente rifiuta di comunicarli, potrebbe essere impossibile per questa Applicazione fornire il Servizio. Nei casi in cui questa Applicazione indichi alcuni Dati come facoltativi, gli Utenti sono liberi di astenersi dal comunicare tali Dati, senza che ci?? abbia alcuna conseguenza sulla disponibilit?? del Servizio o sulla sua operativit??.</Text>
                  <Text style={styles.BigregularTxt}>
                    Gli Utenti che dovessero avere dubbi su quali Dati siano obbligatori, sono incoraggiati a contattare il Titolare. L???eventuale utilizzo di Cookie - o di altri strumenti di tracciamento - da parte di questa Applicazione o dei titolari dei servizi terzi utilizzati da questa Applicazione, ove non diversamente precisato, ha la finalit?? di fornire il Servizio richiesto dall'Utente, oltre alle ulteriori finalit?? descritte nel presente documento e nella Cookie Policy, se disponibile.
                  </Text>
                  <Text style={styles.BigregularTxt}>L'Utente si assume la responsabilit?? dei Dati Personali di terzi ottenuti, pubblicati o condivisi mediante questa Applicazione e garantisce di avere il diritto di comunicarli o diffonderli, liberando il Titolare da qualsiasi responsabilit?? verso terzi.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]}>Modalit?? e luogo del trattamento dei Dati raccolti</Text>
                  <Text style={[styles.bigBoldTxt, { fontSize: 16 }]}>Modalit?? di trattamento</Text>
                  <Text style={styles.BigregularTxt}>
                    Il trattamento viene effettuato mediante strumenti informatici e/o telematici, con modalit?? organizzative e con logiche strettamente correlate alle finalit?? indicate. Oltre al Titolare, in alcuni casi, potrebbero avere accesso ai Dati altri soggetti coinvolti nell???organizzazione di questa Applicazione (personale amministrativo, commerciale, marketing, legali, amministratori di sistema) ovvero soggetti esterni (come fornitori di servizi tecnici terzi, corrieri postali, hosting
                    provider, societ?? informatiche, agenzie di comunicazione) nominati anche, se necessario, Responsabili del Trattamento da parte del Titolare. L???elenco aggiornato dei Responsabili potr?? sempre essere richiesto al Titolare del Trattamento.
                  </Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]}>Base giuridica del trattamento</Text>
                  <Text style={[styles.bigBoldTxt, { fontSize: 16 }]}>Il Titolare tratta Dati Personali relativi all???Utente in caso sussista una delle seguenti condizioni:</Text>
                  <Text style={styles.BigregularTxt}>
                    ??? l???Utente ha prestato il consenso per una o pi?? finalit?? specifiche. Nota: in alcuni ordinamenti il Titolare pu?? essere autorizzato a trattare Dati Personali senza che debba sussistere il consenso dell???Utente o un???altra delle basi giuridiche specificate di seguito, fino a quando l???Utente non si opponga (???opt-out???) a tale trattamento. Ci?? non ?? tuttavia applicabile qualora il trattamento di Dati Personali sia regolato dalla legislazione europea in materia di protezione dei
                    Dati Personali;
                  </Text>
                  <Text style={styles.BigregularTxt}>??? il trattamento ?? necessario all'esecuzione di un contratto con l???Utente e/o all'esecuzione di misure precontrattuali;</Text>
                  <Text style={styles.BigregularTxt}>??? il trattamento ?? necessario per adempiere un obbligo legale al quale ?? soggetto il Titolare;</Text>
                  <Text style={styles.BigregularTxt}>??? il trattamento ?? necessario per l'esecuzione di un compito di interesse pubblico o per l'esercizio di pubblici poteri di cui ?? investito il Titolare;</Text>
                  <Text style={styles.BigregularTxt}>??? il trattamento ?? necessario per il perseguimento del legittimo interesse del Titolare o di terzi.</Text>
                  <Text style={styles.BigregularTxt}>?? comunque sempre possibile richiedere al Titolare di chiarire la concreta base giuridica di ciascun trattamento ed in particolare di specificare se il trattamento sia basato sulla legge, previsto da un contratto o necessario per concludere un contratto.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]}>Luogo</Text>
                  <Text style={styles.BigregularTxt}>I Dati sono trattati presso le sedi operative del Titolare ed in ogni altro luogo in cui le parti coinvolte nel trattamento siano localizzate. Per ulteriori informazioni, contattare il Titolare.</Text>
                  <Text style={styles.BigregularTxt}>I Dati Personali dell???Utente potrebbero essere trasferiti in un paese diverso da quello in cui l???Utente si trova. Per ottenere ulteriori informazioni sul luogo del trattamento l???Utente pu?? fare riferimento alla sezione relativa ai dettagli sul trattamento dei Dati Personali.</Text>
                  <Text style={styles.BigregularTxt}>L???Utente ha diritto a ottenere informazioni in merito alla base giuridica del trasferimento di Dati al di fuori dell???Unione Europea o ad un???organizzazione internazionale di diritto internazionale pubblico o costituita da due o pi?? paesi, come ad esempio l???ONU, nonch?? in merito alle misure di sicurezza adottate dal Titolare per proteggere i Dati.</Text>
                  <Text style={styles.BigregularTxt}>L???Utente pu?? verificare se abbia luogo uno dei trasferimenti appena descritti esaminando la sezione di questo documento relativa ai dettagli sul trattamento di Dati Personali o chiedere informazioni al Titolare contattandolo agli estremi riportati in apertura.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]}>Periodo di conservazione</Text>
                  <Text style={styles.BigregularTxt}>Periodo di conservazione</Text>
                  <Text style={styles.BigregularTxt}>??? I Dati Personali raccolti per scopi collegati all???esecuzione di un contratto tra il Titolare e l???Utente saranno trattenuti sino a quando sia completata l???esecuzione di tale contratto.</Text>
                  <Text style={styles.BigregularTxt}>??? I Dati Personali raccolti per finalit?? riconducibili all???interesse legittimo del Titolare saranno trattenuti sino al soddisfacimento di tale interesse. L???Utente pu?? ottenere ulteriori informazioni in merito all???interesse legittimo perseguito dal Titolare nelle relative sezioni di questo documento o contattando il Titolare.</Text>
                  <Text style={styles.BigregularTxt}>
                    Quando il trattamento ?? basato sul consenso dell???Utente, il Titolare pu?? conservare i Dati Personali pi?? a lungo sino a quando detto consenso non venga revocato. Inoltre, il Titolare potrebbe essere obbligato a conservare i Dati Personali per un periodo pi?? lungo in ottemperanza ad un obbligo di legge o per ordine di un???autorit??. Al termine del periodo di conservazione i Dati Personali saranno cancellati. Pertanto, allo spirare di tale termine il diritto di accesso,
                    cancellazione, rettificazione ed il diritto alla portabilit?? dei Dati non potranno pi?? essere esercitati.
                  </Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]}>Finalit?? del Trattamento dei Dati raccolti</Text>
                  <Text style={styles.BigregularTxt}>I Dati dell???Utente sono raccolti per consentire al Titolare di fornire il Servizio, adempiere agli obblighi di legge, rispondere a richieste o azioni esecutive, tutelare i propri diritti ed interessi (o quelli di Utenti o di terze parti), individuare eventuali attivit?? dolose o fraudolente, nonch?? per le seguenti finalit??: Registrazione ed autenticazione fornite direttamente da questa Applicazione e Gestione dei dati di attivit??.</Text>
                  <Text style={styles.BigregularTxt}>Per ottenere informazioni dettagliate sulle finalit?? del trattamento e sui Dati Personali trattati per ciascuna finalit??, l???Utente pu?? fare riferimento alla sezione ???Dettagli sul trattamento dei Dati Personali???.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]}>Dettagli sul trattamento dei Dati Personali</Text>
                  <Text style={styles.BigregularTxt}>I Dati Personali sono raccolti per le seguenti finalit?? ed utilizzando i seguenti servizi:</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]}>??? Gestione dei dati di attivit??</Text>
                  <Text style={styles.BigregularTxt}>
                    Questo tipo di servizi consente al Titolare di utilizzare i dati di attivit?? raccolti da un tuo dispositivo al fine di permettere a questa Applicazione di funzionare o di erogare delle funzionalit?? specifiche. Questo potrebbe includere i tuoi movimenti, il battito cardiaco, spostamenti in altitudine o altri dati su ci?? che ti circonda. A seconda di quanto descritto in seguito, delle terze parti potrebbero essere coinvolte nell'attivit?? di tracciamento. La gran parte dei
                    dispositivi permette all'Utente di controllare quali Dati sono accessibili e quali vengono salvati. Apple HealthKit (Apple Inc.)
                  </Text>
                  <Text style={styles.BigregularTxt}>HealthKit ?? un servizio di gestione dei dati di attivit?? fornito da Apple Inc. che permette al Titolare di avere accesso ai dati di attivit?? e di salvarli.</Text>
                  <Text style={styles.BigregularTxt}>Dati Personali trattati: battito cardiaco ed altri dati vitali; data di nascita; sesso. Luogo del trattamento: Stati Uniti ??? Privacy Policy.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]}>??? Registrazione ed autenticazione fornite direttamente da questa Applicazione</Text>
                  <Text style={styles.BigregularTxt}>Con la registrazione o l???autenticazione l???Utente consente a questa Applicazione di identificarlo e di dargli accesso a servizi dedicati. I Dati Personali sono raccolti e conservati esclusivamente a scopo di registrazione o di identificazione. I Dati raccolti sono solo quelli necessari a fornire il servizio richiesto dall???Utente. Registrazione diretta (questa Applicazione)</Text>
                  <Text style={styles.BigregularTxt}>L???Utente si registra compilando il modulo di registrazione e fornendo direttamente a questa Applicazione i propri Dati Personali.</Text>
                  <Text style={styles.BigregularTxt}>Dati Personali trattati: nome e cognome; email; sesso, data di nascita.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]}>Ulteriori informazioni sui Dati Personali</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]}>??? Notifiche push</Text>
                  <Text style={styles.BigregularTxt}>Nella maggior parte dei casi, gli Utenti possono scegliere di non ricevere notifiche push consultando le impostazioni del proprio dispositivo, come le impostazioni di notifica per i telefoni cellulari, e modificando quindi tali impostazioni per questa Applicazione, per alcune o per tutte le applicazioni presenti sul dispositivo in questione.</Text>
                  <Text style={styles.BigregularTxt}>L???Utente si registra compilando il modulo di registrazione e fornendo direttamente a questa Applicazione i propri Dati Personali.</Text>
                  <Text style={styles.BigregularTxt}>Gli Utenti devono essere consapevoli che la disabilitazione delle notifiche push pu?? influire negativamente sull'utilizzo di questa Applicazione.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]}>??? Analisi dei Dati dell???Utente e previsioni (???profilazione???)</Text>
                  <Text style={styles.BigregularTxt}>Il Titolare potrebbe trattare i dati d???utilizzo raccolti attraverso questa Applicazione per creare o aggiornare profili di utenza. Questo tipo di trattamento consente al Titolare di valutare scelte, preferenze e comportamento dell???Utente per gli scopi specificati nelle rispettive sezioni di questo documento.</Text>
                  <Text style={styles.BigregularTxt}>I profili d???utenza possono essere creati anche grazie a strumenti automatizzati, come algoritmi, che possono anche essere offerti da terze parti. Per ottenere ulteriori informazioni sull???attivit?? di profilazione l???Utente pu?? fare riferimento alle rispettive sezioni di questo documento.</Text>
                  <Text style={styles.BigregularTxt}>L???Utente ha in ogni momento diritto ad opporsi a tale attivit?? di profilazione. Per scoprire di pi?? sui diritti dell???Utente e su come esercitarli, l???Utente pu?? fare riferimento alla sezione di questo documento relativa ai diritti degli Utenti.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]}>Diritti dell???Utente</Text>
                  <Text style={styles.BigregularTxt}>Gli Utenti possono esercitare determinati diritti con riferimento ai Dati trattati dal Titolare. In particolare, l???Utente ha il diritto di:</Text>
                  <Text style={styles.BigregularTxt}>
                    <Text style={{ fontWeight: "bold" }}>??? revocare il consenso in ogni momento.</Text> L???Utente pu?? revocare il consenso al trattamento dei propri Dati Personali precedentemente espresso.{" "}
                  </Text>
                  <Text style={styles.BigregularTxt}>
                    <Text style={{ fontWeight: "bold" }}>??? accedere ai propri Dati.</Text> L???Utente ha diritto ad ottenere informazioni sui Dati trattati dal Titolare, su determinati aspetti del trattamento ed a ricevere una copia dei Dati trattati
                  </Text>

                  <Text style={styles.BigregularTxt}>
                    <Text style={{ fontWeight: "bold" }}>??? verificare e chiedere la rettificazione.</Text> L???Utente pu?? verificare la correttezza dei propri Dati e richiederne l???aggiornamento o la correzione.{" "}
                  </Text>
                  <Text style={styles.BigregularTxt}>
                    <Text style={{ fontWeight: "bold" }}>??? ottenere la limitazione del trattamento.</Text> Quando ricorrono determinate condizioni, l???Utente pu?? richiedere la limitazione del trattamento dei propri Dati. In tal caso il Titolare non tratter?? i Dati per alcun altro scopo se non la loro conservazione.{" "}
                  </Text>
                  <Text style={styles.BigregularTxt}>
                    <Text style={{ fontWeight: "bold" }}>??? ottenere la cancellazione o rimozione dei propri Dati Personali. </Text> Quando ricorrono determinate condizioni, l???Utente pu?? richiedere la cancellazione dei propri Dati da parte del Titolare.{" "}
                  </Text>
                  <Text style={styles.BigregularTxt}>
                    <Text style={{ fontWeight: "bold" }}>??? ricevere i propri Dati o farli trasferire ad altro titolare.</Text>. L???Utente ha diritto di ricevere i propri Dati in formato strutturato, di uso comune e leggibile da dispositivo automatico e, ove tecnicamente fattibile, di ottenerne il trasferimento senza ostacoli ad un altro titolare. Questa disposizione ?? applicabile quando i Dati sono trattati con strumenti automatizzati ed il trattamento ?? basato sul consenso dell???Utente, su un
                    contratto di cui l???Utente ?? parte o su misure contrattuali ad esso connesse.
                  </Text>
                  <Text style={styles.BigregularTxt}>
                    <Text style={{ fontWeight: "bold" }}>??? proporre reclamo. </Text> . L???Utente pu?? proporre un reclamo all???autorit?? di controllo della protezione dei dati personali competente o agire in sede giudiziale.
                  </Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]}>Dettagli sul diritto di opposizione</Text>
                  <Text style={styles.BigregularTxt}>Quando i Dati Personali sono trattati nell???interesse pubblico, nell???esercizio di pubblici poteri di cui ?? investito il Titolare oppure per perseguire un interesse legittimo del Titolare, gli Utenti hanno diritto ad opporsi al trattamento per motivi connessi alla loro situazione particolare.</Text>
                  <Text style={styles.BigregularTxt}>Si fa presente agli Utenti che, ove i loro Dati fossero trattati con finalit?? di marketing diretto, possono opporsi al trattamento senza fornire alcuna motivazione. Per scoprire se il Titolare tratti dati con finalit?? di marketing diretto gli Utenti possono fare riferimento alle rispettive sezioni di questo documento.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]}>Come esercitare i diritti</Text>
                  <Text style={styles.BigregularTxt}>Per esercitare i diritti dell???Utente, gli Utenti possono indirizzare una richiesta agli estremi di contatto del Titolare indicati in questo documento. Le richieste sono depositate a titolo gratuito e evase dal Titolare nel pi?? breve tempo possibile, in ogni caso entro un mese.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]}>Ulteriori informazioni sul trattamento</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]}>Difesa in giudizio</Text>
                  <Text style={styles.BigregularTxt}>I Dati Personali dell???Utente possono essere utilizzati da parte del Titolare in giudizio o nelle fasi preparatorie alla sua eventuale instaurazione per la difesa da abusi nell'utilizzo di questa Applicazione o dei Servizi connessi da parte dell???Utente.</Text>
                  <Text style={styles.BigregularTxt}>L???Utente dichiara di essere consapevole che il Titolare potrebbe essere obbligato a rivelare i Dati per ordine delle autorit?? pubbliche.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]}>Informative specifiche</Text>
                  <Text style={styles.BigregularTxt}>Su richiesta dell???Utente, in aggiunta alle informazioni contenute in questa privacy policy, questa Applicazione potrebbe fornire all'Utente delle informative aggiuntive e contestuali riguardanti Servizi specifici, o la raccolta ed il trattamento di Dati Personali.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]}>Log di sistema e manutenzione</Text>
                  <Text style={styles.BigregularTxt}>Per necessit?? legate al funzionamento ed alla manutenzione, questa Applicazione e gli eventuali servizi terzi da essa utilizzati potrebbero raccogliere log di sistema, ossia file che registrano le interazioni e che possono contenere anche Dati Personali, quali l???indirizzo IP Utente.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]}>Informazioni non contenute in questa policy</Text>
                  <Text style={styles.BigregularTxt}>Ulteriori informazioni in relazione al trattamento dei Dati Personali potranno essere richieste in qualsiasi momento al Titolare del Trattamento utilizzando gli estremi di contatto.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]}>Risposta alle richieste ???Do Not Track???</Text>
                  <Text style={styles.BigregularTxt}>Questa Applicazione non supporta le richieste ???Do Not Track???. Per scoprire se gli eventuali servizi di terze parti utilizzati le supportino, l'Utente ?? invitato a consultare le rispettive privacy policy.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]}>Modifiche a questa privacy policy</Text>
                  <Text style={styles.BigregularTxt}>
                    Il Titolare del Trattamento si riserva il diritto di apportare modifiche alla presente privacy policy in qualunque momento notificandolo agli Utenti su questa pagina e, se possibile, su questa Applicazione nonch??, qualora tecnicamente e legalmente fattibile, inviando una notifica agli Utenti attraverso uno degli estremi di contatto di cui ?? in possesso. Si prega dunque di consultare con frequenza questa pagina, facendo riferimento alla data di ultima modifica indicata in
                    fondo.
                  </Text>

                  <Text style={[styles.BigregularTxt, { marginTop: 10, fontSize: 16 }]}>Qualora le modifiche interessino trattamenti la cui base giuridica ?? il consenso, il Titolare provveder?? a raccogliere nuovamente il consenso dell???Utente, se necessario.</Text>

                  <Text style={[styles.BigregularTxt, { marginTop: 10, fontSize: 16, marginBottom: 10 }]}>Settembre 2020</Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

        <View style={styles.topHeaderView}>
          <View style={{ height: 16 }} />
          <TextCommon text={"Registrazione"} color={"#FFFFFF"} textAlign={"center"} fontSize={global.fontSize_17} fontWeight={"600"} textAlign={"center"} fontFamily={"Montserrat-Bold"} />
          <View style={{ height: "13%" }} />
          <View style={styles.imageMainView}>
            <Image source={require("../../../../Image/splash_logo.png")} style={{ height: 120, width: 150, resizeMode: "contain" }} />
          </View>
        </View>

        <ScrollView>
          <View style={{ marginLeft: "15%" }}>
            <Text
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 20,
                borderRadius: 50 / 2,
                color: global.secondary,
                flex: 1,
                marginTop: 20,
              }}
            >
              DOTT./DOTT.SSA
            </Text>
          </View>
          <View style={styles.buttonPadding}>
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: global.secondary,
                height: 50,
                borderRadius: 50 / 2,
                color: global.secondary,
                alignItems: "center",
                flex: 1,
                marginTop: 8,
              }}
            >
              <FontAwesome name="user" color={global.secondary} size={20} style={{ marginLeft: 20 }} />
              <TextinputCommon
                placeHolder={"NOME E COGNOME"}
                placeholderTextColor={global.secondary}
                value={this.state.name}
                onChangeTxt={(e) => {
                  this.onNameChangeTxt(e);
                }}
                color={global.secondary}
                editable={this.state.isLoading ? false : true}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: global.secondary,
                height: 50,
                borderRadius: 50 / 2,
                color: global.secondary,
                alignItems: "center",
                flex: 1,
                marginTop: 8,
              }}
            >
              <AntDesign name="calendar" color={global.secondary} size={20} style={{ marginLeft: 20 }} />
              <TextinputCommon placeHolder={"DATA DI NASCITA"} placeholderTextColor={global.secondary} value={this.state.date} color={global.secondary} editable={false} />
              {this.state.showDate && (
                <DatePicker
                  style={{ width: "100%", height: 50, position: "absolute", opcity: 0, borderWidth: 0 }}
                  date={this.state.date} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  placeholder="select date"
                  format="DD-MM-YYYY"
                  maxDate={moment().subtract(18, "years").format("DD-MM-YYYY")}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: "absolute",
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                      opacity: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                      borderWidth: 0,
                      opacity: 0,
                    },
                  }}
                  onDateChange={(date) => {
                    this.setState({ date: date });
                  }}
                />
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: global.secondary,
                height: 50,
                borderRadius: 50 / 2,
                color: global.secondary,
                alignItems: "center",
                flex: 1,
                marginTop: 8,
              }}
            >
              <Ionicons name="location" color={global.secondary} size={20} style={{ marginLeft: 20 }} />
              <TextinputCommon
                placeHolder={"PROVINCIA ORDINE DEI MEDICI"}
                placeholderTextColor={global.secondary}
                value={this.state.pod}
                onChangeTxt={(e) => {
                  this.onPodChangeTxt(e);
                }}
                color={global.secondary}
                editable={this.state.isLoading ? false : true}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: global.secondary,
                height: 50,
                borderRadius: 50 / 2,
                color: global.secondary,
                alignItems: "center",
                flex: 1,
                marginTop: 8,
              }}
            >
              <FontAwesome name="user-md" color={global.secondary} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
              <RNPickerSelect
                value={this.state.specialization}
                onValueChange={(value) => this.setSpecialist(value)}
                placeholder={{}}
                items={[
                  { label: "SELEZIONA UNA PROFESSIONE", value: "" },
                  { label: "Medico di famiglia", value: "Medico di famiglia" },
                  { label: "Specialista", value: "Specialista" },
                ]}
                style={{
                  inputIOS: {
                    fontSize: 16,
                    paddingVertical: 15,
                    marginLeft: 25,
                    paddingLeft: 20,
                    paddingRight: 30, // to ensure the text is never behind the icon
                    color: global.secondary,
                    fontWeight: "bold",
                    maxWidth: Dimensions.get("screen").width * 0.73,
                    width: Dimensions.get("screen").width * 0.73,
                  },
                  inputAndroid: {
                    maxWidth: Dimensions.get("screen").width * 0.73,
                    width: Dimensions.get("screen").width * 0.73,
                    fontSize: 15,
                    paddingVertical: 15,
                    marginLeft: 25,
                    paddingLeft: 20,
                    paddingRight: 30, // to ensure the text is never behind the icon
                    color: global.secondary,
                    fontWeight: "bold",
                  },
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: global.secondary,
                height: 50,
                borderRadius: 50 / 2,
                color: global.secondary,
                alignItems: "center",
                flex: 1,
                marginTop: 8,
              }}
            >
              <FontAwesome name="user-md" color={global.secondary} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
              <RNPickerSelect
                value={this.state.specialization_info}
                onValueChange={(value) => this.setSpecialization(value)}
                placeholder={{}}
                disabled={this.state.specialization != "Specialista"}
                items={[
                  { label: "SELEZIONA UNA SPECIALIZZAZIONE", value: "Seleziona una specializzazione" },
                  { label: "Allergologia ed immunologia clinica", value: "Allergologia ed immunologia clinica" },
                  { label: "Angiologia", value: "Angiologia" },
                  { label: "Audiologia e foniatria", value: "Audiologia e foniatria" },
                  { label: "Cardiologia", value: "Cardiologia" },
                  { label: "Chirurgia generale", value: "Chirurgia generale" },
                  { label: "Chirurgia maxillo-facciale", value: "Chirurgia maxillo-facciale" },
                  { label: "Chirurgia pediatrica", value: "Chirurgia pediatrica" },
                  { label: "Chirurgia plastica e ricostruttiva", value: "Chirurgia plastica e ricostruttiva" },
                  { label: "Chirurgia toracica", value: "Chirurgia toracica" },
                  { label: "Chirurgia vascolare", value: "Chirurgia vascolare" },
                  { label: "Continuit?? assistenziale", value: "Continuit?? assistenziale" },
                  { label: "Cure palliative", value: "Cure palliative" },
                  { label: "Dermatologia e venereologia", value: "Dermatologia e venereologia" },
                  { label: "Ematologia", value: "Ematologia" },
                  { label: "Endocrinologia", value: "Endocrinologia" },
                  { label: "Farmacologia e tossicologia clinica", value: "Farmacologia e tossicologia clinica" },
                  { label: "Gastroenterologia", value: "Gastroenterologia" },
                  { label: "Genetica medica", value: "Genetica medica" },
                  { label: "Geriatria", value: "Geriatria" },
                  { label: "Ginecologia e ostetricia", value: "Ginecologia e ostetricia" },
                  { label: "Igiene degli alimenti e della nutrizione", value: "Igiene degli alimenti e della nutrizione" },
                  { label: "Igiene, epidemiologia e sanit?? pubblica", value: "Igiene, epidemiologia e sanit?? pubblica" },
                  { label: "Malattie dell'apparato respiratorio", value: "Malattie dell'apparato respiratorio" },
                  { label: "Malattie infettive", value: "Malattie infettive" },
                  { label: "Malattie metaboliche e diabetologia", value: "Malattie metaboliche e diabetologia" },
                  { label: "Medicina del lavoro", value: "Medicina del lavoro" },
                  { label: "Medicina dello sport", value: "Medicina dello sport" },
                  { label: "Medicina di comunit??", value: "Medicina di comunit??" },
                  { label: "Medicina e chirurgia di accettazione e di urgenza", value: "Medicina e chirurgia di accettazione e di urgenza" },
                  { label: "Medicina fisica e riabilitazione", value: "Medicina fisica e riabilitazione" },
                  { label: "Medicina interna", value: "Medicina interna" },
                  { label: "Medicina legale", value: "Medicina legale" },
                  { label: "Medicina nucleare", value: "Medicina nucleare" },
                  { label: "Medicina termale", value: "Medicina termale" },
                  { label: "Medicina trasfusionale", value: "Medicina trasfusionale" },
                  { label: "Microbiologia e virologia", value: "Microbiologia e virologia" },
                  { label: "Nefrologia", value: "Nefrologia" },
                  { label: "Neonatologia", value: "Neonatologia" },
                  { label: "Neurochirurgia", value: "Neurochirurgia" },
                  { label: "Neurologia", value: "Neurologia" },
                  { label: "Neuropsichiatria infantile", value: "Neuropsichiatria infantile" },
                  { label: "Neuroradiologia", value: "Neuroradiologia" },
                  { label: "Oftalmologia", value: "Oftalmologia" },
                  { label: "Ortopedia e traumatologia", value: "Ortopedia e traumatologia" },
                  { label: "Otorinolaringoiatria", value: "Otorinolaringoiatria" },
                  { label: "Patologia clinica", value: "Patologia clinica" },
                  { label: "Pediatria", value: "Pediatria" },
                  { label: "Psichiatria", value: "Psichiatria" },
                  { label: "Psicoterapia", value: "Psicoterapia" },
                  { label: "Radiodiagnostica", value: "Radiodiagnostica" },
                  { label: "Radioterapia", value: "Radioterapia" },
                  { label: "Scienza dell'alimentazione", value: "Scienza dell'alimentazione" },
                  { label: "Urologia", value: "Urologia" },
                ]}
                style={{
                  inputIOS: {
                    fontSize: 16,
                    paddingVertical: 15,
                    marginLeft: 25,
                    paddingLeft: 20,
                    paddingRight: 30, // to ensure the text is never behind the icon
                    color: global.secondary,
                    fontWeight: "bold",
                    width: Dimensions.get("screen").width * 0.73,
                    maxWidth: Dimensions.get("screen").width * 0.73,
                  },
                  inputAndroid: {
                    width: Dimensions.get("screen").width * 0.73,
                    maxWidth: Dimensions.get("screen").width * 0.73,
                    fontSize: 16,
                    paddingVertical: 15,
                    marginLeft: 25,
                    paddingLeft: 20,
                    paddingRight: 30, // to ensure the text is never behind the icon
                    color: global.secondary,
                    fontWeight: "bold",
                  },
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: global.secondary,
                height: 50,
                borderRadius: 50 / 2,
                color: global.secondary,
                alignItems: "center",
                flex: 1,
                marginTop: 8,
              }}
            >
              <Fontisto name="email" color={global.secondary} size={20} style={{ marginLeft: 20 }} />
              <TextinputCommon
                placeHolder={"EMAIL"}
                placeholderTextColor={global.secondary}
                value={this.state.email}
                onChangeTxt={(e) => {
                  this.onEmailChangeTxt(e);
                }}
                color={global.secondary}
                editable={this.state.isLoading ? false : true}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: global.secondary,
                height: 50,
                borderRadius: 50 / 2,
                color: global.secondary,
                alignItems: "center",
                flex: 1,
                marginTop: 8,
              }}
            >
              <Entypo name="lock" color={global.secondary} size={20} style={{ marginLeft: 20 }} />
              <TextinputCommon
                placeHolder={"PASSWORD"}
                placeholderTextColor={global.secondary}
                isPasswordType={true}
                value={this.state.password}
                onChangeTxt={(e) => {
                  this.onPassChangeTxt(e);
                }}
                color={global.secondary}
                editable={this.state.isLoading ? false : true}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: global.secondary,
                height: 50,
                borderRadius: 50 / 2,
                color: global.secondary,
                alignItems: "center",
                flex: 1,
                marginTop: 8,
              }}
            >
              <Entypo name="lock" color={global.secondary} size={20} style={{ marginLeft: 20 }} />
              <TextinputCommon
                placeHolder={"RIPETI PASSWORD"}
                placeholderTextColor={global.secondary}
                isPasswordType={true}
                value={this.state.cnf_password}
                onChangeTxt={(e) => {
                  this.onCnfPassChangeTxt(e);
                }}
                color={global.secondary}
                editable={this.state.isLoading ? false : true}
              />
            </View>

            {/* <View style={{ height: 18 }} />
            <RoundedButton
              btnText={"MEDICO NON PRESENTE NELL???ALBO"}
              value={this.state.name}
              onChangeTxt={(e) => { this.onNameChangeTxt(e) }}
              backgroundColor={global.red}
            /> */}
            <View style={{ height: 18 }} />
            <View style={styles.rowView}>
              <TouchableOpacity style={styles.radioPaddingView} activeOpacity={0.8} onPress={() => this.setState({ acceptTerms: !this.state.acceptTerms })}>
                <View style={[styles.radioStyle, { backgroundColor: this.state.acceptTerms ? global.skyBlue : global.white }]}></View>
              </TouchableOpacity>
              <View style={{ width: 6 }} />
              <TouchableOpacity
                onPress={() => {
                  this.openPP();
                }}
                style={{ borderBottomColor: global.secondary, borderBottomWidth: 1 }}
              >
                <TextCommon text={"Accetta Privacy Policy"} color={global.lightBlack} textAlign={"center"} fontSize={global.fontSize_14} textAlign={"center"} fontFamily={"Montserrat-SemiBold"} />
              </TouchableOpacity>
            </View>
            <View style={{ height: 22 }} />
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.onNextPress(type)} style={styles.buttonStyle}>
              {this.state.isLoading ? <ActivityIndicator style={{ justifyContent: "center", alignSelf: "center", flex: 1 }} color={"white"} size="small" /> : <AntDesign size={20} name="right" color="white" />}
            </TouchableOpacity>
            <View style={{ height: 22 }} />
          </View>
        </ScrollView>

        <View style={styles.commonImageStyle}>
          <Image source={require("../../../../Image/common_icon.png")} />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, action) => {
  let RegisterDocData = "";
  let RegisterDocerror = "";
  let RegisterDocIsLoding = "";

  if (state && state.Register) {
    RegisterDocData = state.RegisterDoc.success;
    (RegisterDocerror = state.RegisterDoc.error), (RegisterDocIsLoding = state.RegisterDoc.isLoading);
  }

  return {
    RegisterDocData,
    RegisterDocerror,
    RegisterDocIsLoding,
  };
};

// const mapDispatchToProps = dispatch => bindActionCreators({
//   registerApi: data => dispatch(registerApi(data)),
// }, dispatch)

const mapDispatchToProps = (dispatch) => {
  return {
    registerDocApi: (data, type) => {
      dispatch(registerDocApi(data, type));
    },
    initIO: (data, navigation) => dispatch(initIO(data, navigation)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorRegisterScreen);
