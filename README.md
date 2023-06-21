
# Angular Project for Start2Impact 

Questo progetto Angular è stato sviluppato da Ivan Ferrigno come oggetto di esame per Start2Impact, il progetto prevede la creazione di un mock social network utilizzando le Api di https://gorest.co.in/ , che possono essere fruite sia pubblicamente, ma sopratutto una delle richieste di progetto è utilizzare un token fornito dalla piattaforma GoRest per l'autenticazione dell'utente finale in modo da poter gestire le proprie Api.
L'applicazione è stata sviluppata tenendo conto delle best practice in tema di suddivisione delle cartelle in moduli, componenti, servizi, guardie. Per rendere l'applicazione più performante è stato utilizzato il lazyloading, inoltre tutte le route sono protette da autenticazione, semplicemente controlla se l'utente ha inserito il proprio token e che sia valido durante la fase di login, nonchè la prima pagina che viene presentata all'utente finale una volta inizializzata l'applicazione. 
## Provare l'app online 
### Link deploy  
- [Firebase link 1](https://socialmock-project.firebaseapp.com)
-   [Firebase link 2](https://socialmock-project.web.app)

## Installazione
Per la prova in locale è necessario : 
- **Nodejs**
- Editor di codice (**Visual studio code**)
- **Clonare** questa repository dalla console del tuo code editor con il comando
```bash
  git clone https://github.com/herakle-dev/ntt-data-project-s2i
```
- Installare le dipendenze con il comando 
```bash
  npm install
```
- Dalla console utilizzare il comando
```bash
  ng serve --open
```
## Dipendenze principali
- @angular/animations
Versione: ^15.2.0

La libreria @angular/animations fornisce il supporto per le animazioni all'interno dell'applicazione Angular. È possibile utilizzarla per aggiungere animazioni fluide e interattive agli elementi del tuo progetto.

- @angular/cdk
Versione: ^15.2.9

@angular/cdk è il Component Dev Kit (CDK) di Angular. Fornisce un set di strumenti e componenti essenziali che possono essere utilizzati per creare applicazioni Angular più complesse e interattive.

- @angular/common
Versione: ^15.2.0

@angular/common è una libreria di base di Angular che contiene le funzionalità comuni utilizzate in tutto il framework.

- @angular/compiler
Versione: ^15.2.0

La libreria @angular/compiler fornisce il compilatore just-in-time (JIT) di Angular, che analizza il codice TypeScript dell'applicazione e lo traduce in codice JavaScript eseguibile.

- @angular/core
Versione: ^15.2.0

@angular/core è una delle librerie principali di Angular e contiene le funzionalità fondamentali del framework, come il sistema di moduli, il sistema di dependency injection e altre funzionalità di base.

- @angular/forms
Versione: ^15.2.0

La libreria @angular/forms offre il supporto per la gestione dei form all'interno delle applicazioni Angular, inclusa la validazione dei dati inseriti dagli utenti.

- @angular/material
Versione: ^15.2.9

@angular/material è una libreria che implementa il Material Design di Google per Angular. Fornisce una vasta gamma di componenti UI predefiniti, come bottoni, modali, tabelle e molto altro, che possono essere utilizzati per creare interfacce utente moderne e intuitive.

- @angular/platform-browser
Versione: ^15.2.0

La libreria @angular/platform-browser contiene le implementazioni di Angular specifiche per i browser, come il rendering del DOM, la manipolazione degli eventi e altre funzionalità legate all'ambiente di esecuzione del browser.

- @angular/platform-browser-dynamic
Versione: ^15.2.0

@angular/platform-browser-dynamic fornisce il supporto per la compilazione e l'esecuzione dinamica degli script Angular all'interno del browser. Questa libreria è utilizzata per l'avvio dell'applicazione Angular nel browser.

- @angular/router
Versione: ^15.2.0

La libreria @angular/router offre un routing client-side per le applicazioni Angular. Consente di gestire la navigazione tra le diverse visualizzazioni dell'applicazione in modo efficace e gestibile.

- @fortawesome/fontawesome-svg-core
Versione: ^6.4.0

@fortawesome/fontawesome-svg-core è una libreria che fornisce icone vettoriali scalabili (SVG) di alta qualità provenienti dalla collezione Font Awesome. Puoi utilizzare questa libreria per aggiungere icone stilizzate al tuo progetto Angular.

- @fortawesome/free-solid-svg-icons
Versione: ^6.4.0

La libreria @fortawesome/free-solid-svg-icons contiene una vasta gamma di icone vettoriali solidi provenienti dalla collezione Font Awesome. Puoi utilizzare queste icone per arricchire l'aspetto delle tue interfacce utente.

- animate.css
Versione: ^4.1.1

animate.css è una libreria di animazioni CSS pronte all'uso. Fornisce una collezione di classi CSS che possono essere utilizzate per animare gli elementi dell'interfaccia utente in modo semplice e veloce.

- bootstrap
Versione: ^5.2.3

bootstrap è una popolare libreria CSS e JavaScript per la creazione di interfacce web responsive e di alta qualità. È ampiamente utilizzata per lo sviluppo di applicazioni web moderne.

- bootstrap-icons
Versione: ^1.10.5

La libreria bootstrap-icons fornisce una vasta gamma di icone SVG di alta qualità che possono essere utilizzate all'interno del tuo progetto Angular. Le icone possono essere facilmente personalizzate e adattate alle tue esigenze.

- ngx-bootstrap-icons
Versione: ^1.9.2

ngx-bootstrap-icons è una libreria che semplifica l'utilizzo di icone Bootstrap all'interno delle applicazioni Angular. Fornisce componenti Angular che consentono di utilizzare facilmente le icone Bootstrap nei tuoi template.

- rxjs
Versione: ~7.8.0

La libreria rxjs è una libreria reattiva per JavaScript che fornisce supporto per la programmazione asincrona basata sugli observable. È ampiamente utilizzata in applicazioni Angular per gestire flussi di dati reattivi.

- tslib
Versione: ^2.5.3

tslib è una libreria TypeScript che fornisce varie funzionalità utili, come supporto per le annotazioni dei tipi, funzioni di utilità e altro ancora. È spesso utilizzata come dipendenza per i progetti TypeScript.

- zone.js
Versione: ~0.12.0

zone.js è una libreria che fornisce un sistema di zone per JavaScript. È utilizzata internamente da Angular per la gestione degli eventi asincroni e del ciclo di vita delle applicazioni.

## Dipendenze di sviluppo
- @angular-devkit/build-angular
Versione: ^15.2.8

La libreria @angular-devkit/build-angular fornisce gli strumenti necessari per compilare e distribuire un'applicazione Angular. Contiene anche una serie di plugin e configurazioni per facilitare il processo di build.

- @angular-eslint/builder
Versione: 15.2.1

@angular-eslint/builder è un builder specifico per Angular che consente di eseguire l'analisi statica del codice TypeScript utilizzando ESLint.

- @angular-eslint/eslint-plugin
Versione: 15.2.1

La libreria @angular-eslint/eslint-plugin è un plugin ESLint specifico per Angular che fornisce regole aggiuntive per l'analisi statica del codice TypeScript all'interno di progetti Angular.

- @angular-eslint/eslint-plugin-template
Versione: 15.2.1

@angular-eslint/eslint-plugin-template è un plugin ESLint specifico per Angular che fornisce regole per l'analisi statica dei template HTML all'interno di progetti Angular.

- @angular-eslint/schematics
Versione: 15.2.1

La libreria @angular-eslint/schematics fornisce schemi e generatori di codice specifici per Angular che possono essere utilizzati con l'Angular CLI per automatizzare le attività di sviluppo, come la creazione di componenti, moduli e altro ancora.

- @angular-eslint/template-parser
Versione: 15.2.1

@angular-eslint/template-parser è un parser per l'analisi statica dei template HTML all'interno di progetti Angular utilizzando ESLint.

- @angular/cli
Versione: ~15.2.6

@angular/cli è l'Angular Command Line Interface (CLI) che fornisce uno strumento da riga di comando per la creazione, la gestione e il deployment di progetti Angular.

- @angular/compiler-cli
Versione: ^15.2.0

La libreria @angular/compiler-cli fornisce il compilatore ahead-of-time (AOT) di Angular, che consente di compilare l'applicazione Angular in JavaScript eseguibile in anticipo per una migliore prestazione.

- @types/jasmine
Versione: ~4.3.0

@types/jasmine è una libreria che fornisce le definizioni di tipo TypeScript per Jasmine, un popolare framework di testing per JavaScript.

- @typescript-eslint/eslint-plugin
Versione: 5.48.2

La libreria @typescript-eslint/eslint-plugin è un plugin ESLint specifico per TypeScript che fornisce regole aggiuntive per l'analisi statica del codice TypeScript.

- @typescript-eslint/parser
Versione: 5.48.2

@typescript-eslint/parser è un parser per l'analisi statica del codice TypeScript utilizzando ESLint. Converte il codice TypeScript in un'AST (Abstract Syntax Tree) che può essere analizzato da ESLint.

- eslint
Versione: ^8.33.0

eslint è uno strumento di analisi statica del codice che aiuta a identificare potenziali problemi o errori nel codice JavaScript o TypeScript.

- jasmine-core
Versione: ~4.5.0

jasmine-core è la libreria principale di Jasmine, un framework di testing per JavaScript. Fornisce le funzionalità di base per l'esecuzione dei test.

- karma
Versione: ~6.4.0

karma è un test runner per JavaScript che consente di eseguire i test in diversi browser o ambienti di esecuzione. È spesso utilizzato insieme a Jasmine per l'esecuzione dei test unitari.

- karma-chrome-launcher
Versione: ~3.1.0

karma-chrome-launcher è un plugin Karma che consente di eseguire i test nei browser Google Chrome. È uno dei plugin più comuni utilizzati per l'esecuzione dei test Karma.

- karma-coverage
Versione: ~2.2.0

karma-coverage è un plugin Karma che consente di generare report di copertura del codice durante l'esecuzione dei test. Fornisce informazioni sulle porzioni di codice testate e su quelle non coperte dai test.

- karma-jasmine
Versione: ~5.1.0

karma-jasmine è un plugin Karma che consente di eseguire i test scritti utilizzando Jasmine come framework di testing.

- karma-jasmine-html-reporter
Versione: ~2.0.0

karma-jasmine-html-reporter è un plugin Karma che genera un report HTML dettagliato sull'esecuzione dei test Jasmine. Il report include informazioni sui test eseguiti, i successi e gli eventuali errori o fallimenti.

- typescript
Versione: ~4.9.4

typescript è il linguaggio di programmazione principale utilizzato in Angular. È un superset di JavaScript che aggiunge funzionalità aggiuntive come i tipi statici e le caratteristiche ECMAScript più recenti.

## Requisiti app richiesti :

 - Pagina di login per autenticare l'utente e relativa funzionalità di logout.
 - Pagina principale che mostra tutti gli utenti a sistema, scegliendo quanti utenti visualizzare, inoltre è possibile effettuare ricerche, creare un nuovo utente, ed eliminare quelli esistenti 
 - Pagina dettagli utente singolo, clickando su qualsiasi utente si viene indirizzati al profilo dell'utente dove si possono trovare tutti i suoi post, commenti ai post e si possono creare nuovi commenti ai post esistenti.
 - Pagina elenco post dove è possibile trovare tutti i post presenti a sistema, i suoi relativi commenti per ogni post, si ha la possibilità di creare nuovi post in questa pagina.
 - Test coverage almeno del 60%
 ## Coverage Ottenuta :
- 81.35% Statements 371/456
-  70.83% Branches 34/48
-   72.84% Functions 110/151
-   82.35% Lines 350/425)

## Screenshots
- Pagina di login

![Login page](
screenshot/login.png
)

- Pagina utenti

![User page](
screenshot/globalUser.png
)
- Creazione nuovo utente 
![New user](
screenshot/newUser.png
)
- Pagina dettaglio utente 
![User details](
screenshot/userDetails.png
)

- Nuovo post utente 
![User details Form](
screenshot/usernewpost.png
)
- Commenti ai post dell'utente
![UserComment](
screenshot/userComment.png
)
- Sezione Post globali
![Global Post](
screenshot/globalPost.png
)
- Commenti ai singoli post nella sezione post
  
![Post comments](
   screenshot/globalPostComment.png
)
- Creazione nuovo post


![New post](
screenshot/newPostForm.png
)
