/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Modal, Image, SafeAreaView, StatusBar, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { StackActions, NavigationActions } from "react-navigation";
import styles from './styles';
import TextCommon from '../../../Common/TextCommon'
import RoundedButton from '../../../Common/RoundedButton'
import global from "../../../Common/global";
import TextinputCommon from "../../../Common/TextinputCommon";
import LoadingScreen from "../../../Common/LoadingScreen";
import { registerApi } from '../../../../Actions/registerAction'
import { bindActionCreators } from 'redux'
import { constant } from './constant'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import storage from "../../../../utils/storage";
import BackButton from "../../../../common/BackButton";

//import vector icons

class PatientRegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptTerms: true,
      name: "",
      email: "",
      password: "",
      cnf_password: "",
      privacy_policy: "",
      isLoding: false,
      showPP: false
    };
  }
  componentDidMount() {

  }
  onNextPress = async (type) => {

    if (this.validation()) {
      this.setState({ isLoading: true })
      var data = {
        "name": this.state.name,
        "sur_name": "",
        "email": this.state.email,
        "password": this.state.password,
        "privacy_policy": this.state.acceptTerms,
        "gender": "",
        "validated": false,
        "age": 0,
        "birth_date": "",
        "address": "",
        "city": "",
        "height": 0,
        "weight": 0,
        "life_style": ""
      }
      var _temp = ""
      if (type == "MEDICO") {
        _temp = "doctor"
      } else {
        _temp = "patient"
      }
      console.log("call123")
      let response = await registerApi(data, _temp)
      console.log("resgere", response["status"])
      if (response) {
        this.setState({ isLoading: false })
        if (response["status"] == "success") {
          storage.set("Login", JSON.stringify(response))
          this.setState({ isLoading: false })
          Alert.alert(
            '',
            response["message"],
            [
              { text: 'OK', onPress: () => { this.props.navigation.navigate("PatientRegisterConfirmScreen") } },
            ]
          );

        } else {
          Alert.alert('Errore', response.errors[0].msg, [{ text: 'OK', onPress: () => {  } }]);
        }

      }
    }

  }

  validation = () => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.state.name.length) {
      alert(constant.errName)
      return false
    } else if (!this.state.email.length) {
      alert(constant.errEmail)
      return false
    } else if (reg.test(this.state.email) === false) {
      alert(constant.errValidEmail)
      return false
    } else if (!this.state.password) {
      alert(constant.errPassword)
      return false
    } else if (this.state.password.length < 6) {
      alert(constant.errValidPassword)
      return false
    } else if (!(this.state.password === this.state.cnf_password)) {
      alert(constant.errCnfPass)
      return false
    } else if (this.state.acceptTerms == false) {
      alert(constant.errTerm)
      return false
    } else {
      return true
    }
  }
  onNameChangeTxt = (value) => {

    this.setState({
      name: value
    })

  }

  onEmailChangeTxt = (value) => {

    this.setState({
      email: value
    })

  }
  onPassChangeTxt = (value) => {

    this.setState({
      password: value
    })

  }
  onCnfPassChangeTxt = (value) => {

    this.setState({
      cnf_password: value
    })

  }
  openPP = () => {
    this.setState({
      showPP: true
    })
  }
  render() {
    if (this.props.RegisterIsLoding) {
      return <ActivityIndicator style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, }} color={'blue'} size="large" />
    }
    const type = this.props.navigation.state.params.type;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <BackButton navigation={this.props.navigation} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showPP}

        >
          <View style={styles.modalMainView}>
            <View style={styles.insideMainView} >
              <View >
                <Entypo style={{ alignSelf: 'flex-end' }} name="cross" onPress={() => { this.setState({ showPP: false }) }} size={40} color={global.white} />
              </View>

              <ScrollView>
                <View style={{ marginHorizontal: 10, marginTop: 20 }} >
                  <Text style={styles.BigregularTxt} >Privacy Policy della App di Telemedicina<Text style={styles.bigBoldTxt} >il mio medico in rete</Text></Text>
                  <Text style={styles.BigregularTxt} >Questa Applicazione raccoglie alcuni Dati Personali dei propri Utenti.</Text>
                  <Text style={styles.BigregularTxt} >Questo documento può essere stampato utilizzando il comando di stampa presente nelle impostazioni di qualsiasi browser.</Text>

                  <Text style={[styles.bigBoldTxt, { alignSelf: 'center', marginTop: 10 }]} >Riassunto della policy</Text>
                  <Text style={[styles.bigBoldTxt, { alignSelf: 'center', marginTop: 10, fontSize: 16 }]} >Dati personali raccolti per le seguenti finalità ed utilizzando i seguenti servizi:</Text>
                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]} >o	Gestione dei dati di attività</Text>
                  <Text style={styles.BigregularTxt} >Apple HealthKit</Text>
                  <Text style={styles.BigregularTxt} >Dati Personali: sesso, età, altezza, peso, battito cardiaco ed altri dati vitali</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]} >o	Registrazione ed autenticazione fornite direttamente da questa Applicazione</Text>
                  <Text style={styles.BigregularTxt} >Registrazione diretta</Text>
                  <Text style={styles.BigregularTxt} >Dati Personali: nome e cognome, sesso, email</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10 }]} >Ulteriori informazioni sui Dati Personali</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]} >o Notifiche push</Text>
                  <Text style={styles.BigregularTxt} >Questa Applicazione può inviare notifiche push all'Utente per raggiungere gli scopi descritti nella presente privacy policy.</Text>
                  <Text style={styles.BigregularTxt} >Nella maggior parte dei casi, gli Utenti possono scegliere di non ricevere notifiche push consultando le impostazioni del proprio dispositivo, come le impostazioni di notifica per i telefoni cellulari, e modificando quindi tali impostazioni per questa Applicazione, per alcune o per tutte le applicazioni presenti sul dispositivo in questione.</Text>
                  <Text style={styles.BigregularTxt} >Gli Utenti devono essere consapevoli che la disabilitazione delle notifiche push può influire negativamente sull'utilizzo di questa Applicazione.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]} >o	Analisi dei Dati dell’Utente e previsioni (“profilazione”)</Text>
                  <Text style={styles.BigregularTxt} >Il Titolare potrebbe trattare i dati d’utilizzo raccolti attraverso questa Applicazione per creare o aggiornare profili di utenza. Questo tipo di trattamento consente al Titolare di valutare scelte, preferenze e comportamento dell’Utente per gli scopi specificati nelle rispettive sezioni di questo documento.</Text>
                  <Text style={styles.BigregularTxt} >I profili d’utenza possono essere creati anche grazie a strumenti automatizzati, come algoritmi, che possono anche essere offerti da terze parti. Per ottenere ulteriori informazioni sull’attività di profilazione l’Utente può fare riferimento alle rispettive sezioni di questo documento.</Text>
                  <Text style={styles.BigregularTxt} >L’Utente ha in ogni momento diritto ad opporsi a tale attività di profilazione. Per scoprire di più sui diritti dell’Utente e su come esercitarli, l’Utente può fare riferimento alla sezione di questo documento relativa ai diritti degli Utenti.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10 }]} >Informazioni di contattoInformazioni di contatto</Text>
                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]} >o	Titolare del Trattamento dei Dati</Text>
                  <Text style={styles.BigregularTxt} >Med Stage Srl, Via Gioacchino Rossini 10 - 20062 Cassano d'Adda (MI)</Text>
                  <Text style={styles.BigregularTxt} ><Text style={styles.bigBoldTxt} >Indirizzo email del Titolare:</Text> info@medstage.it</Text>

                  <Text style={[styles.bigBoldTxt, { alignSelf: 'center', marginTop: 10 }]} >Policy completa</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]} >o	Titolare del Trattamento dei Dati</Text>
                  <Text style={styles.BigregularTxt} >Med Stage Srl, Via Coluccio Salutati 7 - 20144 Milano</Text>
                  <Text style={styles.BigregularTxt} ><Text style={styles.bigBoldTxt} >Indirizzo email del Titolare:</Text>info@medstage.it</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]} >Dati raccolti</Text>
                  <Text style={styles.BigregularTxt} >Fra i Dati Personali raccolti da questa Applicazione, in modo autonomo o tramite terze parti, ci sono: nome; cognome; sesso; email; data di nascita; altezza, peso; battito cardiaco ed altri dati vitali.</Text>
                  <Text style={styles.BigregularTxt} >Dettagli completi su ciascuna tipologia di dati raccolti sono forniti nelle sezioni dedicate di questa privacy policy o mediante specifici testi informativi visualizzati prima della raccolta dei dati stessi.</Text>
                  <Text style={styles.BigregularTxt} >I Dati Personali possono essere liberamente forniti dall'Utente o, nel caso di Dati di Utilizzo, raccolti automaticamente durante l'uso di questa Applicazione.</Text>
                  <Text style={styles.BigregularTxt} >Se non diversamente specificato, tutti i Dati richiesti da questa Applicazione sono obbligatori. Se l’Utente rifiuta di comunicarli, potrebbe essere impossibile per questa Applicazione fornire il Servizio. Nei casi in cui questa Applicazione indichi alcuni Dati come facoltativi, gli Utenti sono liberi di astenersi dal comunicare tali Dati, senza che ciò abbia alcuna conseguenza sulla disponibilità del Servizio o sulla sua operatività.</Text>
                  <Text style={styles.BigregularTxt} >Gli Utenti che dovessero avere dubbi su quali Dati siano obbligatori, sono incoraggiati a contattare il Titolare.
                  L’eventuale utilizzo di Cookie - o di altri strumenti di tracciamento - da parte di questa Applicazione o dei titolari dei servizi terzi utilizzati da questa Applicazione, ove non diversamente precisato, ha la finalità di fornire il Servizio richiesto dall'Utente, oltre alle ulteriori finalità descritte nel presente documento e nella Cookie Policy, se disponibile.</Text>
                  <Text style={styles.BigregularTxt} >L'Utente si assume la responsabilità dei Dati Personali di terzi ottenuti, pubblicati o condivisi mediante questa Applicazione e garantisce di avere il diritto di comunicarli o diffonderli, liberando il Titolare da qualsiasi responsabilità verso terzi.</Text>


                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]} >Modalità e luogo del trattamento dei Dati raccolti</Text>
                  <Text style={[styles.bigBoldTxt, { fontSize: 16 }]} >Modalità di trattamento</Text>
                  <Text style={styles.BigregularTxt} >Il trattamento viene effettuato mediante strumenti informatici e/o telematici, con modalità organizzative e con logiche strettamente correlate alle finalità indicate. Oltre al Titolare, in alcuni casi, potrebbero avere accesso ai Dati altri soggetti coinvolti nell’organizzazione di questa Applicazione (personale amministrativo, commerciale, marketing, legali, amministratori di sistema) ovvero soggetti esterni (come fornitori di servizi tecnici terzi, corrieri postali, hosting provider, società informatiche, agenzie di comunicazione) nominati anche, se necessario, Responsabili del Trattamento da parte del Titolare. L’elenco aggiornato dei Responsabili potrà sempre essere richiesto al Titolare del Trattamento.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]} >Base giuridica del trattamento</Text>
                  <Text style={[styles.bigBoldTxt, { fontSize: 16 }]} >Il Titolare tratta Dati Personali relativi all’Utente in caso sussista una delle seguenti condizioni:</Text>
                  <Text style={styles.BigregularTxt} >•	l’Utente ha prestato il consenso per una o più finalità specifiche. Nota: in alcuni ordinamenti il Titolare può essere autorizzato a trattare Dati Personali senza che debba sussistere il consenso dell’Utente o un’altra delle basi giuridiche specificate di seguito, fino a quando l’Utente non si opponga (“opt-out”) a tale trattamento. Ciò non è tuttavia applicabile qualora il trattamento di Dati Personali sia regolato dalla legislazione europea in materia di protezione dei Dati Personali;</Text>
                  <Text style={styles.BigregularTxt} >•	il trattamento è necessario all'esecuzione di un contratto con l’Utente e/o all'esecuzione di misure precontrattuali;</Text>
                  <Text style={styles.BigregularTxt} >•	il trattamento è necessario per adempiere un obbligo legale al quale è soggetto il Titolare;</Text>
                  <Text style={styles.BigregularTxt} >•	il trattamento è necessario per l'esecuzione di un compito di interesse pubblico o per l'esercizio di pubblici poteri di cui è investito il Titolare;</Text>
                  <Text style={styles.BigregularTxt} >•	il trattamento è necessario per il perseguimento del legittimo interesse del Titolare o di terzi.</Text>
                  <Text style={styles.BigregularTxt} >È comunque sempre possibile richiedere al Titolare di chiarire la concreta base giuridica di ciascun trattamento ed in particolare di specificare se il trattamento sia basato sulla legge, previsto da un contratto o necessario per concludere un contratto.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]} >Luogo</Text>
                  <Text style={styles.BigregularTxt} >I Dati sono trattati presso le sedi operative del Titolare ed in ogni altro luogo in cui le parti coinvolte nel trattamento siano localizzate. Per ulteriori informazioni, contattare il Titolare.</Text>
                  <Text style={styles.BigregularTxt} >I Dati Personali dell’Utente potrebbero essere trasferiti in un paese diverso da quello in cui l’Utente si trova. Per ottenere ulteriori informazioni sul luogo del trattamento l’Utente può fare riferimento alla sezione relativa ai dettagli sul trattamento dei Dati Personali.</Text>
                  <Text style={styles.BigregularTxt} >L’Utente ha diritto a ottenere informazioni in merito alla base giuridica del trasferimento di Dati al di fuori dell’Unione Europea o ad un’organizzazione internazionale di diritto internazionale pubblico o costituita da due o più paesi, come ad esempio l’ONU, nonché in merito alle misure di sicurezza adottate dal Titolare per proteggere i Dati.</Text>
                  <Text style={styles.BigregularTxt} >L’Utente può verificare se abbia luogo uno dei trasferimenti appena descritti esaminando la sezione di questo documento relativa ai dettagli sul trattamento di Dati Personali o chiedere informazioni al Titolare contattandolo agli estremi riportati in apertura.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]} >Periodo di conservazione</Text>
                  <Text style={styles.BigregularTxt} >Periodo di conservazione</Text>
                  <Text style={styles.BigregularTxt} >•	I Dati Personali raccolti per scopi collegati all’esecuzione di un contratto tra il Titolare e l’Utente saranno trattenuti sino a quando sia completata l’esecuzione di tale contratto.</Text>
                  <Text style={styles.BigregularTxt} >•	I Dati Personali raccolti per finalità riconducibili all’interesse legittimo del Titolare saranno trattenuti sino al soddisfacimento di tale interesse. L’Utente può ottenere ulteriori informazioni in merito all’interesse legittimo perseguito dal Titolare nelle relative sezioni di questo documento o contattando il Titolare.</Text>
                  <Text style={styles.BigregularTxt} >Quando il trattamento è basato sul consenso dell’Utente, il Titolare può conservare i Dati Personali più a lungo sino a quando detto consenso non venga revocato. Inoltre, il Titolare potrebbe essere obbligato a conservare i Dati Personali per un periodo più lungo in ottemperanza ad un obbligo di legge o per ordine di un’autorità.
                  Al termine del periodo di conservazione i Dati Personali saranno cancellati. Pertanto, allo spirare di tale termine il diritto di accesso, cancellazione, rettificazione ed il diritto alla portabilità dei Dati non potranno più essere esercitati.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]} >Finalità del Trattamento dei Dati raccolti</Text>
                  <Text style={styles.BigregularTxt} >I Dati dell’Utente sono raccolti per consentire al Titolare di fornire il Servizio, adempiere agli obblighi di legge, rispondere a richieste o azioni esecutive, tutelare i propri diritti ed interessi (o quelli di Utenti o di terze parti), individuare eventuali attività dolose o fraudolente, nonché per le seguenti finalità: Registrazione ed autenticazione fornite direttamente da questa Applicazione e Gestione dei dati di attività.</Text>
                  <Text style={styles.BigregularTxt} >Per ottenere informazioni dettagliate sulle finalità del trattamento e sui Dati Personali trattati per ciascuna finalità, l’Utente può fare riferimento alla sezione “Dettagli sul trattamento dei Dati Personali”.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]} >Dettagli sul trattamento dei Dati Personali</Text>
                  <Text style={styles.BigregularTxt} >I Dati Personali sono raccolti per le seguenti finalità ed utilizzando i seguenti servizi:</Text>


                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]} >•	Gestione dei dati di attività</Text>
                  <Text style={styles.BigregularTxt} >Questo tipo di servizi consente al Titolare di utilizzare i dati di attività raccolti da un tuo dispositivo al fine di permettere a questa Applicazione di funzionare o di erogare delle funzionalità specifiche. Questo potrebbe includere i tuoi movimenti, il battito cardiaco, spostamenti in altitudine o altri dati su ciò che ti circonda. A seconda di quanto descritto in seguito, delle terze parti potrebbero essere coinvolte nell'attività di tracciamento.
                  La gran parte dei dispositivi permette all'Utente di controllare quali Dati sono accessibili e quali vengono salvati.
                  Apple HealthKit (Apple Inc.)</Text>
                  <Text style={styles.BigregularTxt} >HealthKit è un servizio di gestione dei dati di attività fornito da Apple Inc. che permette al Titolare di avere accesso ai dati di attività e di salvarli.</Text>
                  <Text style={styles.BigregularTxt} >Dati Personali trattati: battito cardiaco ed altri dati vitali; data di nascita; sesso.
                  Luogo del trattamento: Stati Uniti – Privacy Policy.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]} >•	Registrazione ed autenticazione fornite direttamente da questa Applicazione</Text>
                  <Text style={styles.BigregularTxt} >Con la registrazione o l’autenticazione l’Utente consente a questa Applicazione di identificarlo e di dargli accesso a servizi dedicati. I Dati Personali sono raccolti e conservati esclusivamente a scopo di registrazione o di identificazione. I Dati raccolti sono solo quelli necessari a fornire il servizio richiesto dall’Utente.
                  Registrazione diretta (questa Applicazione)</Text>
                  <Text style={styles.BigregularTxt} >L’Utente si registra compilando il modulo di registrazione e fornendo direttamente a questa Applicazione i propri Dati Personali.</Text>
                  <Text style={styles.BigregularTxt} >Dati Personali trattati: nome e cognome; email; sesso, data di nascita.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 18 }]} >Ulteriori informazioni sui Dati Personali</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]} >•	Notifiche push</Text>
                  <Text style={styles.BigregularTxt} >Nella maggior parte dei casi, gli Utenti possono scegliere di non ricevere notifiche push consultando le impostazioni del proprio dispositivo, come le impostazioni di notifica per i telefoni cellulari, e modificando quindi tali impostazioni per questa Applicazione, per alcune o per tutte le applicazioni presenti sul dispositivo in questione.</Text>
                  <Text style={styles.BigregularTxt} >L’Utente si registra compilando il modulo di registrazione e fornendo direttamente a questa Applicazione i propri Dati Personali.</Text>
                  <Text style={styles.BigregularTxt} >Gli Utenti devono essere consapevoli che la disabilitazione delle notifiche push può influire negativamente sull'utilizzo di questa Applicazione.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]} >•	Analisi dei Dati dell’Utente e previsioni (“profilazione”)</Text>
                  <Text style={styles.BigregularTxt} >Il Titolare potrebbe trattare i dati d’utilizzo raccolti attraverso questa Applicazione per creare o aggiornare profili di utenza. Questo tipo di trattamento consente al Titolare di valutare scelte, preferenze e comportamento dell’Utente per gli scopi specificati nelle rispettive sezioni di questo documento.</Text>
                  <Text style={styles.BigregularTxt} >I profili d’utenza possono essere creati anche grazie a strumenti automatizzati, come algoritmi, che possono anche essere offerti da terze parti. Per ottenere ulteriori informazioni sull’attività di profilazione l’Utente può fare riferimento alle rispettive sezioni di questo documento.</Text>
                  <Text style={styles.BigregularTxt} >L’Utente ha in ogni momento diritto ad opporsi a tale attività di profilazione. Per scoprire di più sui diritti dell’Utente e su come esercitarli, l’Utente può fare riferimento alla sezione di questo documento relativa ai diritti degli Utenti.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]} >Diritti dell’Utente</Text>
                  <Text style={styles.BigregularTxt} >Gli Utenti possono esercitare determinati diritti con riferimento ai Dati trattati dal Titolare.
                  In particolare, l’Utente ha il diritto di:</Text>
                  <Text style={styles.BigregularTxt} ><Text style={{ fontWeight: 'bold' }} >•	revocare il consenso in ogni momento.</Text> L’Utente può revocare il consenso al trattamento dei propri Dati Personali precedentemente espresso. </Text>
                  <Text style={styles.BigregularTxt} ><Text style={{ fontWeight: 'bold' }} >•	accedere ai propri Dati.</Text> L’Utente ha diritto ad ottenere informazioni sui Dati trattati dal Titolare, su determinati aspetti del trattamento ed a ricevere una copia dei Dati trattati</Text>

                  <Text style={styles.BigregularTxt} ><Text style={{ fontWeight: 'bold' }} >•	verificare e chiedere la rettificazione.</Text> L’Utente può verificare la correttezza dei propri Dati e richiederne l’aggiornamento o la correzione.  </Text>
                  <Text style={styles.BigregularTxt} ><Text style={{ fontWeight: 'bold' }} >•	ottenere la limitazione del trattamento.</Text> Quando ricorrono determinate condizioni, l’Utente può richiedere la limitazione del trattamento dei propri Dati. In tal caso il Titolare non tratterà i Dati per alcun altro scopo se non la loro conservazione. </Text>
                  <Text style={styles.BigregularTxt} ><Text style={{ fontWeight: 'bold' }} >•	ottenere la cancellazione o rimozione dei propri Dati Personali. </Text> Quando ricorrono determinate condizioni, l’Utente può richiedere la cancellazione dei propri Dati da parte del Titolare. </Text>
                  <Text style={styles.BigregularTxt} ><Text style={{ fontWeight: 'bold' }} >•	ricevere i propri Dati o farli trasferire ad altro titolare.</Text>. L’Utente ha diritto di ricevere i propri Dati in formato strutturato, di uso comune e leggibile da dispositivo automatico e, ove tecnicamente fattibile, di ottenerne il trasferimento senza ostacoli ad un altro titolare. Questa disposizione è applicabile quando i Dati sono trattati con strumenti automatizzati ed il trattamento è basato sul consenso dell’Utente, su un contratto di cui l’Utente è parte o su misure contrattuali ad esso connesse.</Text>
                  <Text style={styles.BigregularTxt} ><Text style={{ fontWeight: 'bold' }} >•	proporre reclamo.  </Text> . L’Utente può proporre un reclamo all’autorità di controllo della protezione dei dati personali competente o agire in sede giudiziale. </Text>


                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]} >Dettagli sul diritto di opposizione</Text>
                  <Text style={styles.BigregularTxt} >Quando i Dati Personali sono trattati nell’interesse pubblico, nell’esercizio di pubblici poteri di cui è investito il Titolare oppure per perseguire un interesse legittimo del Titolare, gli Utenti hanno diritto ad opporsi al trattamento per motivi connessi alla loro situazione particolare.</Text>
                  <Text style={styles.BigregularTxt} >Si fa presente agli Utenti che, ove i loro Dati fossero trattati con finalità di marketing diretto, possono opporsi al trattamento senza fornire alcuna motivazione. Per scoprire se il Titolare tratti dati con finalità di marketing diretto gli Utenti possono fare riferimento alle rispettive sezioni di questo documento.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]} >Come esercitare i diritti</Text>
                  <Text style={styles.BigregularTxt} >Per esercitare i diritti dell’Utente, gli Utenti possono indirizzare una richiesta agli estremi di contatto del Titolare indicati in questo documento. Le richieste sono depositate a titolo gratuito e evase dal Titolare nel più breve tempo possibile, in ogni caso entro un mese.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]} >Ulteriori informazioni sul trattamento</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]} >Difesa in giudizio</Text>
                  <Text style={styles.BigregularTxt} >I Dati Personali dell’Utente possono essere utilizzati da parte del Titolare in giudizio o nelle fasi preparatorie alla sua eventuale instaurazione per la difesa da abusi nell'utilizzo di questa Applicazione o dei Servizi connessi da parte dell’Utente.</Text>
                  <Text style={styles.BigregularTxt} >L’Utente dichiara di essere consapevole che il Titolare potrebbe essere obbligato a rivelare i Dati per ordine delle autorità pubbliche.</Text>


                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]} >Informative specifiche</Text>
                  <Text style={styles.BigregularTxt} >Su richiesta dell’Utente, in aggiunta alle informazioni contenute in questa privacy policy, questa Applicazione potrebbe fornire all'Utente delle informative aggiuntive e contestuali riguardanti Servizi specifici, o la raccolta ed il trattamento di Dati Personali.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]} >Log di sistema e manutenzione</Text>
                  <Text style={styles.BigregularTxt} >Per necessità legate al funzionamento ed alla manutenzione, questa Applicazione e gli eventuali servizi terzi da essa utilizzati potrebbero raccogliere log di sistema, ossia file che registrano le interazioni e che possono contenere anche Dati Personali, quali l’indirizzo IP Utente.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]} >Informazioni non contenute in questa policy</Text>
                  <Text style={styles.BigregularTxt} >Ulteriori informazioni in relazione al trattamento dei Dati Personali potranno essere richieste in qualsiasi momento al Titolare del Trattamento utilizzando gli estremi di contatto.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]} >Risposta alle richieste “Do Not Track”</Text>
                  <Text style={styles.BigregularTxt} >Questa Applicazione non supporta le richieste “Do Not Track”.
                  Per scoprire se gli eventuali servizi di terze parti utilizzati le supportino, l'Utente è invitato a consultare le rispettive privacy policy.</Text>

                  <Text style={[styles.bigBoldTxt, { marginTop: 10, fontSize: 16 }]} >Modifiche a questa privacy policy</Text>
                  <Text style={styles.BigregularTxt} >Il Titolare del Trattamento si riserva il diritto di apportare modifiche alla presente privacy policy in qualunque momento notificandolo agli Utenti su questa pagina e, se possibile, su questa Applicazione nonché, qualora tecnicamente e legalmente fattibile, inviando una notifica agli Utenti attraverso uno degli estremi di contatto di cui è in possesso. Si prega dunque di consultare con frequenza questa pagina, facendo riferimento alla data di ultima modifica indicata in fondo.</Text>

                  <Text style={[styles.BigregularTxt, { marginTop: 10, fontSize: 16 }]} >Qualora le modifiche interessino trattamenti la cui base giuridica è il consenso, il Titolare provvederà a raccogliere nuovamente il consenso dell’Utente, se necessario.</Text>

                  <Text style={[styles.BigregularTxt, { marginTop: 10, fontSize: 16, marginBottom: 10 }]}>Settembre 2020</Text>










                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

        <View style={styles.topHeaderView}>
          <View style={{ height: '15%' }} />
          {/* Registrazione */}
          <TextCommon
            text={"Registrazione"}
            color={"#FFFFFF"}
            textAlign={"center"}
            fontSize={global.fontSize_17}
            fontWeight={"600"}
            textAlign={"center"}
            fontFamily={"Montserrat-Bold"}
          />
          <View style={{ height: 16 }} />
          <View style={styles.imageMainView}>
            <View />
            <Image source={require("../../../../Image/splash_logo.png",)} style={{ height: 150, width: 150, resizeMode: 'contain' }} />
          </View>

        </View>
        <ScrollView>
          <View style={styles.buttonPadding}>
            <View style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: global.primary,
              height: 50,
              borderRadius: 50 / 2,
              color: global.primary,
              alignItems: 'center',
              flex: 1,
              marginTop: 15
            }}>
              <FontAwesome name="user" color={global.primary} size={20} style={{ marginLeft: 20 }} />
              <TextinputCommon
                placeHolder={"NOME E COGNOME"}
                value={this.state.name}
                placeholderTextColor={global.primary}
                onChangeTxt={(e) => { this.onNameChangeTxt(e) }}
                color={global.primary}
              />
            </View>

            <View style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: global.primary,
              height: 50,
              borderRadius: 50 / 2,
              color: global.primary,
              alignItems: 'center',
              flex: 1,
              marginTop: 20
            }}>
              <Fontisto name="email" color={global.primary} size={20} style={{ marginLeft: 20 }} />
              <TextinputCommon
                placeHolder={"EMAIL"}
                placeholderTextColor={global.primary}
                value={this.state.email}
                onChangeTxt={(e) => { this.onEmailChangeTxt(e) }}
                color={global.primary}
              />
            </View>


            <View style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: global.primary,
              height: 50,
              borderRadius: 50 / 2,
              color: global.primary,
              alignItems: 'center',
              flex: 1,
              marginTop: 20
            }}>
              <Entypo name="lock" color={global.primary} size={20} style={{ marginLeft: 20 }} />
              <TextinputCommon
                placeHolder={"PASSWORD"}
                placeholderTextColor={global.primary}
                isPasswordType={true}
                value={this.state.password}
                onChangeTxt={(e) => { this.onPassChangeTxt(e) }}
                color={global.primary}
              />
            </View>
            <View style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: global.primary,
              height: 50,
              borderRadius: 50 / 2,
              color: global.primary,
              alignItems: 'center',
              flex: 1,
              marginTop: 20
            }}>
              <Entypo name="lock" color={global.primary} size={20} style={{ marginLeft: 20 }} />
              <TextinputCommon
                placeHolder={"RIPETI PASSWORD"}
                placeholderTextColor={global.primary}
                isPasswordType={true}
                value={this.state.cnf_password}
                onChangeTxt={(e) => { this.onCnfPassChangeTxt(e) }}
                color={global.primary}
              />
            </View>

            <View style={{ height: 18 }} />
            <View style={styles.rowView}>
              <TouchableOpacity style={styles.radioPaddingView} activeOpacity={0.8} onPress={() => this.setState({ acceptTerms: !this.state.acceptTerms })}>
                <View style={[styles.radioStyle, { backgroundColor: this.state.acceptTerms ? global.green : global.white }]}>
                </View>
              </TouchableOpacity>
              <View style={{ width: 6 }} />
              <TouchableOpacity onPress={() => { this.openPP() }} style={{ borderBottomColor: global.primary, borderBottomWidth: 1 }} >
                <TextCommon
                  text={"Accetta Privacy Policy"}
                  color={global.lightBlack}
                  textAlign={"center"}
                  fontSize={global.fontSize_14}
                  textAlign={"center"}
                  fontFamily={"Montserrat-SemiBold"}
                />
              </TouchableOpacity>

            </View>
            <View style={{ height: 22 }} />
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.onNextPress(type)} style={styles.buttonStyle}>
              {this.state.isLoading ? <ActivityIndicator style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, }} color={"white"} size="small" />
                : <AntDesign size={20} name="right" color="white" />}

            </TouchableOpacity>
            <View style={{ height: 22 }} />
          </View>
        </ScrollView>

        <View style={styles.commonImageStyle}>
          <Image source={require("../../../../Image/common_icon.png",)} />
        </View>

      </SafeAreaView >
    );
  }
}
const mapStateToProps = (state, action) => {
  let RegisterData = ""
  let Registerrror = ""
  let RegisterIsLoding = ""

  if (state && state.Register) {
    RegisterData = state.Register.success
    Registerrror = state.Register.error,
      RegisterIsLoding = state.Register.isLoading
  }

  return {
    RegisterData,
    Registerrror,
    RegisterIsLoding
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerApi: (data, type) => {
      dispatch(registerApi(data, type));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientRegisterScreen);

