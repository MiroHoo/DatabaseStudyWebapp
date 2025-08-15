# <span style="color:#757575">Database-learning-webapp</span>

## <span style="color:#757575">Esittely</span>

Database-learning-webapp on OAMKin opettajan toiveiden mukaan rakennettu verkkosivu jossa Opettaja voi rakentaa ja ylläpitää testejä joita oppilaat voivat käydä tekemässä. Testit rakennetaan tietokanta kyselyjen opiskelua varten käyttäen SQL esittely tietokanta Sakilaa käyttäen. Sivulta myös löytyy pelimäinen tapa opiskella tietokanta kyselyitä jossa opillaille annetaan satunnainen kysymys johon vastata. Oppilaalla on kolme yritystä, kunnes häntä pyydetään antamaan nimi jolloin oppilaan saamat pisteet lähetetään tietotokannan korkea pistemäärä taulukkoon.

## <span style="color:#757575">Käyttötarkoitus</span>

Database-learning-webappin tarkoitus on tehdä palvelu jossa voi rakentaa ja tehdä tietokanta kyselyihin liityviä testejä. Tarkoitus on luoda rento tapa opiskella tietokanta kyselyitä melkein millä tahansa laitteella.

## <span style="color:#757575">Toiminta</span>

Database-learning-webappiin voi mennä testejä tekemään tai peliä pelaamaan kuka tahansa. Opettaja taas kirjautumalla sisään voi rakentaa ja muokata testejä joita opiskelijat voivat tehdä verkkosivulla. 

## <span style="color:#757575">Käyttöönotto</span>

Sovelluksen käyttöönotto on hyvin helppoa. Dokumentissa esitetty sovellus vaatii vain Renderin (kuva 1) tai samankaltaisen pilvipalvelun tarjoamia palveluja. Render tarjoaa asiakkailleen tietokantojen, verkkosivujen ja niiden backendien hostausta. Verkkosivu vaattii nopean backendin sillä testien logiikka voi olla palvelimelle vaativaa, mutta sivu myös toimii pienellä käyttäjä määrällä Renderin tarjoamalla ilmais versiolla. Tietokannan voi myös laittaa Renderiin, mutta tämä ei ole ilmaista. Pienin hinta on 7 USD kuukaudessa jolla pystyy pyörittämään verkkosivuun tarvittavan tietokannan. Ilmaiseksi saa myös frontendin pyörimään Renderiin hyvin helposti static webappin kautta. Ilmaisversio on voimassa vain 32 päivää kunnes pienin hinta on 19 USD kuukaudessa.

![](/ReadMeResources/pricing.png)

*KUVA 1. Kuvassa esitetään pilvipalvelutarjoaja Renderin hinnastoa.*

Jos haluaa verkkosivun Renderin ulkopuolelle täytyy pystyä hostamaan tietokanta, NodeJs backend ja React + Vite frontend.

Käyttöön otto myös vaattii verkkosivulle tilin lisäämisen! Verkkosivulle voi lisätä tilin esimerkiksi Postman (kuva 2) työkalulla, sillä verkkosivulla on vain opettaja jolla tili täytyy olla!

![](/ReadMeResources/Postman.png)

*KUVA 2. Kuvassa esitetään kuinka tili tehdään tietokantaan.*

## <span style="color:#757575">Projektissa käytetyt teknologiat </span>

Edeltä mainittu projektin stack sisältää Javascript-kirjasto React + Vite, SQL-tietokannan ja Javascript-kirjasto Node.js:n. React-kirjasto mahdollistaa moniosaisen ja dynaamisen verkkosivun käyttöliittymän rakentamisen resursseja säästäen. React mahdollistaa yhden sivun sovelluksen käyttämisen, joka vähentää kuormaa tietokannan ja verkkosivun välillä vähentämällä käyttäjän sivujen latauskertoja. 

SQL-tietokanta taas valittiin sillä projektin tarkoituksena on mahdollistaa SQL kyselyjen opiskelu joten pohjalle vaadittiin SQL tietokanta.

Node.js-kirjasto taas antaa mahdollisuuden kommunikoida edeltä mainitun SQL-tietokannan kanssa.

## <span style="color:#757575">Tietokantarakenne</span>

Tietokannan rakenne on melko yksinkertainen (kuva 2). 

![](/ReadMeResources/TietokantaRakenne.png)

*KUVA 3. Kuvassa esitetään projektin tietokantarakenne*

Sakila samassa tietokannassa (kuva 3). 

![](/ReadMeResources/Sakila.png)

*KUVA 4. Kuvassa esitetään projektin tietokantarakennetta*

- Test-taulussa säilytettään kaikki testien nimet ja keskiarvoinen pistemäärä.
- Question-taulussa on taas kaikki Opettajan rakentamat kysymykset ja niiden testiä vastaava Id.
- Student_Scores-taulusta löytyy kaikki oppilaiden saamat pisteet ja vastaukset jotta opettaja voi tarkastella niitä.  
- Arcade_Scores-taulussa on peliin liityvä korkein piste taulukko joka näytetään käyttäjälle peli osuudessa verkkosivua. 
- Login-taulussa on kaikki käyttäjä tilit jolla verkkosivulle voi kirjautua. Salasana joka on hashattu ja käyttäjän käyttäjänimi. 
- Samassa tietokannassa on myös SQL esimerkki tietokanta jota käytetään kysymyksissä.  

## <span style="color:#757575">Käyttöliittymäsuunnitelma</span>

Alkuperäinen käyttöliittymä suunnitelma (kuva 4).

![](/ReadMeResources/UI.jpg)

*KUVA 4. Kuvassa esitetään projektin alkuperäinen UI suunitelma*

