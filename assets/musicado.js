// Musicado Application JavaScript - Fixed Version with Cart and Discount Issues Resolved
(function() {
    'use strict';

    // Product Variant IDs
    const VARIANT_IDS = {
        'one': '52062844846413',      // One song
        'ep': '52062845796685',       // EP (4 songs)
        'album': '52062847467853'     // Full album
    };

    // Translations
    const translations = {
        en: {
            intro: "Welcome to our professional music creation service! Choose your package and let us create custom songs just for you.",
            mainIntro: "Effortlessly create your own music in just a few clicks: Choose any style— from folk, hip-hop, pop or classic. Add your own words or lyrics, and share your unique track with your loved ones.",
            listenExamples: "Listen to our examples",
            example1Title: "Loading...",
            example1Description: "Random example from our collection",
            example2Title: "Loading...", 
            example2Description: "Random example from our collection",
            playAnother: "🔄 Play Another Example",
            audioNotSupported: "Your browser does not support the audio element.",
            featuredTestimonial1: '"The quality blew me away! After hearing their examples, I knew I had to order. The final song was even better than I imagined - truly professional work!"',
            featuredTestimonial2: '"I listened to their examples and immediately placed an order for my wedding. The song they created became the highlight of our ceremony. Absolutely perfect!"',
            featuredTestimonial3: '"Perfect for my mom\'s birthday! The song captured all our family memories beautifully. She cried happy tears when she heard it. Such a personal and meaningful gift!"',
            featuredTestimonial4: '"Amazing quality and super fast delivery! I ordered a surprise song for my girlfriend and it turned out incredible. The lyrics were exactly what I wanted to say."',
            swipeHint: "← Swipe for more reviews →",
            traditionalWay: "The Traditional Way",
            instrument: "Instrument: €2000,-",
            studioSession: "Studio session: €3000,-",
            timeRequired: "Time: 20-40 hours",
            traditionalTotal: "Total: €5000+ & weeks of work",
            versus: "VS",
            ourWay: "Our Way",
            fewClicks: "A few clicks",
            lovingMessage: "A loving message",
            professionalQuality: "Professional quality",
            ourTotal: "Starting at just €49 (Full Albums: Custom pricing)",
            comparisonConclusion: "Why spend thousands when you can create something equally beautiful and personal for a fraction of the cost?",
            customerReviews: "What our customers say",
            testimonial1: '"Amazing! They created the perfect love song for my anniversary. My partner was in tears - it was exactly what we dreamed of. Highly recommended!"',
            testimonial2: '"I ordered an EP for my mom\'s 60th birthday with family memories in the lyrics. The quality was outstanding and she plays it every day!"',
            testimonial3: '"Professional service from start to finish. The rock album they made for our band sounds like it was produced in a major studio. Worth every euro!"',
            basedOnReviews: "Based on 247+ reviews",
            customerDetails: "Customer Details",
            firstName: "First Name *",
            middleName: "Middle Name",
            lastName: "Last Name *",
            customerEmailField: "Email Address *",
            mobilePhone: "Mobile Phone *",
            deliveryMethod: "Music Delivery Information",
            deliveryInfo: "📧 We will send you a link via email to your personal page where you can download your music within 24 hours.",
            importantInfo: "Important Information",
            deliveryTime: "You will receive an email link to download your music within 24 hours.",
            questionsContact: "Any questions about your order:",
            agreeTerms: "I agree with the terms and conditions and privacy policy",
            readFullPrivacy: "Read our full privacy policy",
            discountCodeTitle: "Discount Code",
            discountCodePlaceholder: "Enter discount code (optional)",
            applyDiscount: "Apply",
            discountApplied: "Discount applied successfully! You save €",
            invalidDiscount: "Invalid discount code. Please check and try again.",
            discountAlreadyApplied: "Discount code already applied.",
            subtotal: "Subtotal:",
            discount: "Discount (15%):",
            finalTotal: "Total:",
            discountTitle: "🎵 Get 15% OFF Your Purchase!",
            discountEmailDescription: "Enter your email to unlock 15% off your custom song creation!",
            discountEmailPlaceholder: "Enter your email address",
            emailConsentText: "I agree to receive promotional emails and special offers from musicado. You can unsubscribe at any time.",
            getDiscount: "Get My 15% Discount",
            discountTermsPrivacy: "We respect your privacy. No spam, and you can unsubscribe anytime.",
            discountSuccessTitle: "🎉 Thank You!",
            discountSuccessMessage: "Your discount has been applied! Use the code below at checkout:",
            discountValidityInfo: "This code is valid for 30 days and has been automatically applied to your cart.",
            copyCode: "Copy Code",
            continueToCheckout: "Continue to Checkout",
            newsletterTitle: "Sign up to get special discounts",
            newsletterDescription: "Be the first to know about new music styles, exclusive offers, and special promotions!",
            newsletterEmailPlaceholder: "Enter your email address",
            subscribe: "Subscribe",
            newsletterTerms: "No spam, unsubscribe at any time. We respect your privacy.",
            legalDocumentTitle: "Legal Document for Website Use",
            privacyStatement: "Welcome to musicado (\"we,\" \"our,\" or \"us\"). Your privacy and the security of your personal information are extremely important to us. This Privacy and Protection Statement explains how we collect, use, store, and protect your data when you visit our website and purchase AI-created music or use our related services.",
            fullAlbumContactTitle: "🎵 Full Album Inquiry",
            fullAlbumContactDescription: "Interested in a full album? We'd love to create something amazing for you! Leave your details and we'll contact you within 24 hours with a personalized quote.",
            emailAddress: "Email Address *",
            phoneNumber: "Mobile Phone *",
            topic: "Topic",
            additionalNotes: "Additional Notes (Optional)",
            submitContact: "Submit Contact Request",
            emailPlaceholder: "your@email.com",
            phonePlaceholder: "+31 6 12345678",
            notesPlaceholder: "Tell us more about your album vision...",
            selectPackage: "Select your package:",
            oneSong: "One Song",
            ep: "EP (4 songs)",
            fullAlbum: "Full Album:",
            contactForPricing: "Contact us for custom pricing",
            usageDisclaimer: "All songs created can be used for personal use only, for commercial use, please contact us. We can publish your song on Spotify on your demand.",
            musicStyles: "Select your two favorite music styles:",
            firstMusicStyle: "First Music Style *",
            secondMusicStyle: "Second Music Style *",
            selectOption: "-- Select an option --",
            favoriteArtists: "Enter your favorite Artists:",
            voiceSelection: "Select voice preference:",
            maleVoice: "Male Voice",
            femaleVoice: "Female Voice",
            noVoicePreference: "No Preference",
            reason: "Reason for this song:",
            myself: "For myself",
            love: "For my love",
            friend: "For my friend",
            mom: "For Mom",
            dad: "For my dad",
            sibling: "For my Brother or Sister",
            other: "Other",
            wordsNames: "What words or names would you like to have back in the songs:",
            songLanguage: "What language do you want the songs to be:",
            dutch: "Dutch",
            english: "English",
            french: "French",
            german: "German",
            spanish: "Spanish",
            portuguese: "Portuguese",
            songTitles: "Give the songs a title (leave blank for us to choose):",
            ownLyrics: "Do you have your own lyrics or a story about the song: Enter here:",
            continue: "Continue to Summary",
            orderSummary: "Order Summary",
            paymentInfo: "Payment Information",
            stripeNotice: "Secure payment processing powered by Stripe",
            payNow: "Pay Now",
            contactRequest: "Full Album Request",
            contactNotice: "We will contact you within 24 hours to discuss your custom full album needs and provide a personalized quote.",
            submitRequest: "Submit Full Album Request",
            goBack: "Go Back",
            adminPanel: "Admin Panel",
            backToCustomer: "Back to Customer",
            exportRTF: "Export to RTF",
            allOrders: "All Orders",
            pending: "Pending",
            completed: "Completed",
            addNewOrder: "Add New Order Data",
            customerName: "Customer Name",
            customerEmail: "Customer Email",
            orderStatus: "Order Status",
            inProgress: "In Progress",
            notes: "Notes",
            addOrder: "Add Order",
            orderHistory: "Order History",
            date: "Date",
            customer: "Customer",
            package: "Package",
            price: "Price",
            status: "Status",
            actions: "Actions"
        },
        nl: {
            intro: "Welkom bij onze professionele muziekcreatie service! Kies uw pakket en laat ons aangepaste liedjes voor u maken.",
            mainIntro: "Creëer moeiteloos uw eigen muziek in slechts een paar klikken: Kies elke stijl— van folk, hip-hop, pop of klassiek. Voeg uw eigen woorden of teksten toe, en deel uw unieke track met uw geliefden.",
            listenExamples: "Luister naar onze voorbeelden",
            example1Title: "Laden...",
            example1Description: "Willekeurig voorbeeld uit onze collectie",
            example2Title: "Laden...",
            example2Description: "Willekeurig voorbeeld uit onze collectie", 
            playAnother: "🔄 Speel Ander Voorbeeld",
            audioNotSupported: "Uw browser ondersteunt het audio element niet.",
            featuredTestimonial1: '"De kwaliteit was overweldigend! Na het horen van hun voorbeelden wist ik dat ik moest bestellen. Het uiteindelijke liedje was nog beter dan ik me had voorgesteld - echt professioneel werk!"',
            featuredTestimonial2: '"Ik luisterde naar hun voorbeelden en plaatste meteen een bestelling voor onze bruiloft. Het liedje dat ze creëerden werd het hoogtepunt van onze ceremonie. Absoluut perfect!"',
            featuredTestimonial3: '"Perfect voor mama\'s verjaardag! Het liedje vatte al onze familie herinneringen prachtig samen. Ze huilde tranen van geluk toen ze het hoorde. Zo\'n persoonlijk en betekenisvol cadeau!"',
            featuredTestimonial4: '"Geweldige kwaliteit en super snelle levering! Ik bestelde een verrassingsliedje voor mijn vriendin en het werd ongelooflijk. De teksten waren precies wat ik wilde zeggen."',
            swipeHint: "← Veeg voor meer reviews →",
            traditionalWay: "De Traditionele Manier",
            instrument: "Instrument: €2000,-",
            studioSession: "Studiosessie: €3000,-",
            timeRequired: "Tijd: 20-40 uur",
            traditionalTotal: "Totaal: €5000+ & weken werk",
            versus: "VS",
            ourWay: "Onze Manier",
            fewClicks: "Een paar klikken",
            lovingMessage: "Een liefdevol bericht",
            professionalQuality: "Professionele kwaliteit",
            ourTotal: "Vanaf slechts €49 (Volledige Albums: Prijs op aanvraag)",
            comparisonConclusion: "Waarom duizenden uitgeven als je iets even moois en persoonlijks kunt maken voor een fractie van de kosten?",
            customerReviews: "Wat onze klanten zeggen",
            testimonial1: '"Geweldig! Ze hebben het perfecte liefdesliedje voor onze verjaardag gemaakt. Mijn partner was in tranen - het was precies wat we droomden. Zeer aanbevolen!"',
            testimonial2: '"Ik bestelde een EP voor mama\'s 60e verjaardag met familiherinneringen in de teksten. De kwaliteit was uitstekend en ze speelt het elke dag!"',
            testimonial3: '"Professionele service van begin tot eind. Het rockalbum dat ze voor onze band maakten klinkt alsof het in een grote studio is geproduceerd. Elke euro waard!"',
            basedOnReviews: "Gebaseerd op 247+ beoordelingen",
            customerDetails: "Klantgegevens",
            firstName: "Voornaam *",
            middleName: "Tussenvoegsel",
            lastName: "Achternaam *",
            customerEmailField: "E-mailadres *",
            mobilePhone: "Mobiele Telefoon *",
            deliveryMethod: "Muziek Bezorg Informatie",
            deliveryInfo: "📧 We sturen je een link via e-mail naar je persoonlijke pagina waar je je muziek binnen 24 uur kunt downloaden.",
            importantInfo: "Belangrijke Informatie",
            deliveryTime: "Je ontvangt binnen 24 uur een e-mail link om je muziek te downloaden.",
            questionsContact: "Vragen over uw bestelling:",
            agreeTerms: "Ik ga akkoord met de algemene voorwaarden en het privacybeleid",
            readFullPrivacy: "Lees ons volledige privacybeleid",
            discountCodeTitle: "Kortingscode",
            discountCodePlaceholder: "Voer kortingscode in (optioneel)",
            applyDiscount: "Toepassen",
            discountApplied: "Korting succesvol toegepast! Je bespaart €",
            invalidDiscount: "Ongeldige kortingscode. Controleer en probeer opnieuw.",
            discountAlreadyApplied: "Kortingscode al toegepast.",
            subtotal: "Subtotaal:",
            discount: "Korting (15%):",
            finalTotal: "Totaal:",
            discountTitle: "🎵 Krijg 15% KORTING op uw aankoop!",
            discountEmailDescription: "Voer uw e-mailadres in om 15% korting te krijgen op uw aangepaste liedjescreatie!",
            discountEmailPlaceholder: "Voer uw e-mailadres in",
            emailConsentText: "Ik ga akkoord met het ontvangen van promotionele e-mails en speciale aanbiedingen van musicado. U kunt zich op elk moment uitschrijven.",
            getDiscount: "Krijg Mijn 15% Korting",
            discountTermsPrivacy: "We respecteren uw privacy. Geen spam, en u kunt zich altijd uitschrijven.",
            discountSuccessTitle: "🎉 Dank je wel!",
            discountSuccessMessage: "Uw korting is toegepast! Gebruik de onderstaande code bij het afrekenen:",
            discountValidityInfo: "Deze code is 30 dagen geldig en is automatisch toegepast op uw winkelwagen.",
            copyCode: "Kopieer Code",
            continueToCheckout: "Ga door naar Afrekenen",
            newsletterTitle: "Meld je aan voor speciale kortingen",
            newsletterDescription: "Wees de eerste die hoort over nieuwe muziekstijlen, exclusieve aanbiedingen en speciale promoties!",
            newsletterEmailPlaceholder: "Voer je e-mailadres in",
            subscribe: "Aanmelden",
            newsletterTerms: "Geen spam, uitschrijven kan altijd. We respecteren je privacy.",
            legalDocumentTitle: "Juridisch Document voor Websitegebruik",
            privacyStatement: "Welkom bij musicado (\"wij,\" \"ons,\" of \"onze\"). Uw privacy en de beveiliging van uw persoonlijke informatie zijn uiterst belangrijk voor ons. Deze Privacy- en Beschermingsverklaring legt uit hoe wij uw gegevens verzamelen, gebruiken, opslaan en beschermen wanneer u onze website bezoekt en door AI gecreëerde muziek koopt of onze gerelateerde diensten gebruikt.",
            fullAlbumContactTitle: "🎵 Volledig Album Aanvraag",
            fullAlbumContactDescription: "Geïnteresseerd in een volledig album? We maken graag iets geweldigs voor je! Laat je gegevens achter en we nemen binnen 24 uur contact met je op met een persoonlijke offerte.",
            emailAddress: "E-mailadres *",
            phoneNumber: "Mobiele Telefoon *",
            topic: "Onderwerp",
            additionalNotes: "Aanvullende Notities (Optioneel)",
            submitContact: "Contact Verzoek Indienen",
            emailPlaceholder: "jouw@email.nl",
            phonePlaceholder: "+31 6 12345678",
            notesPlaceholder: "Vertel ons meer over je albumvisie...",
            selectPackage: "Selecteer uw pakket:",
            oneSong: "Één Liedje",
            ep: "EP (4 liedjes)",
            fullAlbum: "Volledig Album:",
            contactForPricing: "Neem contact op voor prijs op aanvraag",
            usageDisclaimer: "Alle gemaakte liedjes kunnen alleen voor persoonlijk gebruik worden gebruikt. Voor commercieel gebruik, neem contact met ons op. We kunnen uw liedje op verzoek op Spotify publiceren.",
            musicStyles: "Selecteer uw twee favoriete muziekstijlen:",
            firstMusicStyle: "Eerste Muziekstijl *",
            secondMusicStyle: "Tweede Muziekstijl *",
            selectOption: "-- Selecteer een optie --",
            favoriteArtists: "Voer uw favoriete artiesten in:",
            voiceSelection: "Selecteer stem voorkeur:",
            maleVoice: "Mannelijke Stem",
            femaleVoice: "Vrouwelijke Stem", 
            noVoicePreference: "Geen Voorkeur",
            reason: "Reden voor dit liedje:",
            myself: "Voor mezelf",
            love: "Voor mijn liefde",
            friend: "Voor mijn vriend",
            mom: "Voor mama",
            dad: "Voor mijn vader",
            sibling: "Voor mijn broer of zus",
            other: "Anders",
            wordsNames: "Welke woorden of namen wilt u terug hebben in de liedjes:",
            songLanguage: "In welke taal wilt u dat de liedjes zijn:",
            dutch: "Nederlands",
            english: "Engels",
            french: "Frans",
            german: "Duits",
            spanish: "Spaans",
            portuguese: "Portugees",
            songTitles: "Geef de liedjes een titel (laat leeg voor ons om te kiezen):",
            ownLyrics: "Heeft u uw eigen teksten of een verhaal over het liedje: Voer hier in:",
            continue: "Doorgaan naar Samenvatting",
            orderSummary: "Bestelling Samenvatting",
            paymentInfo: "Betalingsinformatie",
            stripeNotice: "Veilige betalingsverwerking mogelijk gemaakt door Stripe",
            payNow: "Nu Betalen",
            contactRequest: "Volledig Album Verzoek",
            contactNotice: "We nemen binnen 24 uur contact met u op om uw aangepaste volledig album wensen te bespreken en een persoonlijke offerte te verstrekken.",
            submitRequest: "Volledig Album Verzoek Indienen",
            goBack: "Ga Terug",
            adminPanel: "Beheerder Paneel",
            backToCustomer: "Terug naar Klant",
            exportRTF: "Exporteren naar RTF",
            allOrders: "Alle Bestellingen",
            pending: "In Behandeling",
            completed: "Voltooid",
            addNewOrder: "Nieuwe Bestelling Toevoegen",
            customerName: "Klant Naam",
            customerEmail: "Klant Email",
            orderStatus: "Bestelling Status",
            inProgress: "In Behandeling",
            notes: "Opmerkingen",
            addOrder: "Bestelling Toevoegen",
            orderHistory: "Bestelling Geschiedenis",
            date: "Datum",
            customer: "Klant",
            package: "Pakket",
            price: "Prijs",
            status: "Status",
            actions: "Acties"
        }
    };

    // Global variables
    let currentLanguage = navigator.language.startsWith('nl') ? 'nl' : 'en';
    let formData = {};
    let orders = JSON.parse(localStorage.getItem('musicOrders') || '[]');
    let discountModalShown = false;
    let appliedDiscountCode = null;

    // FIXED: Enhanced payment processing prevention
    let isProcessingPayment = false;
    let paymentTimeout = null;

    // MP3 files - Updated with actual Shopify CDN URLs
    const mp3Files = [
        { 
            url: "https://cdn.shopify.com/s/files/1/0905/1462/0749/files/Wonderlijke_wereld_van_AI_-_Matelletam.mp3?v=1751830505", 
            title: { en: "Wonderlijke wereld van AI - Matelletam", nl: "Wonderlijke wereld van AI - Matelletam" },
            style: { en: "Electronic/Ambient style", nl: "Electronic/Ambient stijl" }
        },
        { 
            url: "https://cdn.shopify.com/s/files/1/0905/1462/0749/files/Wonderlijke_wereld_van_AI_-_RockyRocky.mp3?v=1751830504", 
            title: { en: "Wonderlijke wereld van AI - RockyRocky", nl: "Wonderlijke wereld van AI - RockyRocky" },
            style: { en: "Rock/Pop style", nl: "Rock/Pop stijl" }
        },
        { 
            url: "https://cdn.shopify.com/s/files/1/0905/1462/0749/files/Survivor_-_Eye_Of_The_Tiger_Official_HD_Video.mp3?v=1751830504", 
            title: { en: "Survivor - Eye Of The Tiger", nl: "Survivor - Eye Of The Tiger" },
            style: { en: "Classic Rock style", nl: "Klassieke Rock stijl" }
        },
        { 
            url: "https://cdn.shopify.com/s/files/1/0905/1462/0749/files/Music_for_vlogs_-_Birthday.mp3?v=1751830505", 
            title: { en: "Birthday Celebration", nl: "Verjaardag Viering" },
            style: { en: "Upbeat/Celebration style", nl: "Vrolijke/Viering stijl" }
        }
    ];

    // Track which files are currently playing to avoid duplicates
    let currentlyPlaying = [null, null];

    // Subheadline arrays
    const subheadlines = {
        en: [
            "Make Your Loved Ones Happy With Personal Songs",
            "Make Your Loved Ones Happy With Personal Songs in Less than 3 minutes",
            "It's music, but personal",
            "Songs that will not only be stuck in their head, but in their hearts.",
            "Your mom has enough perfume, but does she have a song?",
            "It's not simply a song, it's an emotion.",
            "Make Songs For Your Loved Ones, No Skills Required",
            "Imagine your loved ones singing your songs in the shower",
            "It's not simply music, it's a message",
            "Imagine your favourite song but it's personal and will be remembered forever",
            "You're going to THAT store again to buy the same gift as last year? Give something unique and create songs that make your loved ones smile",
            "It's not a gift you give, it's a gift you feel.",
            "Stop giving lame presents to the people you love, make unique songs that stick.",
            "Remember your favourite song? It's that, but personal for the ones you love.",
            "Remember the gift you got her last year? Neither does she. Try This Unforgettable gift and make your loved ones happy.",
            "The greatest gifts are not wrapped, they're experienced.",
            "Another generic bottle of wine? They have enough of those. Let's create some music that makes a party.",
            "Tired of dull Gifts? You're not alone. Discover the most personal gift in the Netherlands.",
            "It's like a giftcard, but 10 times cooler and it plays on spotify.",
            "It could be played at a party, it could be played at a funeral. It's the gift that always works."
        ],
        nl: [
            "Maak Je Geliefden Blij Met Persoonlijke Liedjes",
            "Maak Je Geliefden Blij Met Persoonlijke Liedjes in Minder dan 3 minuten",
            "Het is muziek, maar dan persoonlijk",
            "Liedjes die niet alleen in hun hoofd blijven hangen, maar in hun hart.",
            "Je moeder heeft genoeg parfum, maar heeft ze wel een liedje?",
            "Het is niet zomaar een liedje, het is een emotie.",
            "Maak Liedjes Voor Je Geliefden, Geen Vaardigheden Vereist",
            "Stel je voor dat je geliefden jouw liedjes zingen onder de douche",
            "Het is niet zomaar muziek, het is een boodschap",
            "Stel je je favoriete liedje voor, maar dan persoonlijk en voor altijd herinnerd",
            "Ga je weer naar DIE winkel om hetzelfde cadeau te kopen als vorig jaar? Geef iets unieks en creëer liedjes die je geliefden laten glimlachen",
            "Het is geen cadeau dat je geeft, het is een cadeau dat je voelt.",
            "Stop met saaie cadeaus geven aan mensen van wie je houdt, maak unieke liedjes die blijven plakken.",
            "Weet je nog je favoriete liedje? Dit is dat, maar dan persoonlijk voor degenen van wie je houdt.",
            "Weet je nog het cadeau dat je haar vorig jaar gaf? Zij ook niet. Probeer dit onvergetelijke cadeau en maak je geliefden blij.",
            "De beste cadeaus worden niet ingepakt, ze worden ervaren.",
            "Weer een gewoon flesje wijn? Ze hebben er genoeg van. Laten we wat muziek maken die een feestje wordt.",
            "Moe van saaie cadeaus? Je bent niet alleen. Ontdek het meest persoonlijke cadeau van Nederland.",
            "Het is als een cadeaubon, maar 10 keer cooler en het speelt op Spotify.",
            "Het kan gespeeld worden op een feestje, het kan gespeeld worden op een begrafenis. Het is het cadeau dat altijd werkt."
        ]
    };

    // FIXED: Clear discount state function
    function clearDiscountState() {
        // Clear all discount-related variables
        appliedDiscountCode = null;
        window.appliedDiscount = null;
        localStorage.removeItem('discountAppliedViaModal');
        
        // Reset discount UI
        const discountInput = document.getElementById('discountCodeInput');
        const discountMessage = document.getElementById('discountMessage');
        const applyBtn = document.querySelector('.discount-apply-btn');
        
        if (discountInput) {
            discountInput.value = '';
            discountInput.disabled = false;
        }
        if (discountMessage) {
            discountMessage.style.display = 'none';
            discountMessage.className = 'discount-message';
        }
        if (applyBtn) {
            applyBtn.disabled = false;
            applyBtn.style.opacity = '1';
        }
    }

    // Main Application Object
    const MusicadoApp = {
        init: function() {
            console.log('Musicado App Initializing...');
            
            // FIXED: Clear any stale discount state on init
            clearDiscountState();
            
            // Reset processing flag
            isProcessingPayment = false;
            clearTimeout(paymentTimeout);
            
            this.initializeLanguage();
            this.setupEventListeners();
            this.populateOrdersTable();
            this.setRandomSubheadline();
            
            // Load random audio files for both players
            this.loadRandomAudio(1);
            this.loadRandomAudio(2);
            
            // Initialize words section
            this.updateWordsSection();
            
            // Setup testimonial carousel with a small delay to ensure DOM is ready
            setTimeout(() => {
                this.setupTestimonialCarousel();
            }, 100);
            
            // Setup scroll trigger for discount popup
            this.setupScrollTrigger();
        },

        initializeLanguage: function() {
            this.setLanguage(currentLanguage);
            const activeBtn = document.querySelector(`[data-lang="${currentLanguage}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
        },

        setupEventListeners: function() {
            // Language switcher
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.setLanguage(e.target.dataset.lang);
                });
            });

            // Package selection
            document.querySelectorAll('input[name="package"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    this.updateSongTitles();
                    this.updateWordsSection();
                    document.querySelectorAll('.radio-option').forEach(opt => opt.classList.remove('selected'));
                    e.target.closest('.radio-option').classList.add('selected');
                    
                    // Show full album modal if "contact" package is selected
                    if (e.target.value === 'contact') {
                        this.showFullAlbumModal();
                        // Reset selection to prevent form issues
                        e.target.checked = false;
                        e.target.closest('.radio-option').classList.remove('selected');
                    }
                });
            });

            // Voice selection
            document.querySelectorAll('input[name="voiceType"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    document.querySelectorAll('input[name="voiceType"]').forEach(r => {
                        r.closest('.radio-option').classList.remove('selected');
                    });
                    e.target.closest('.radio-option').classList.add('selected');
                });
            });

            // Reason selection
            const reasonSelect = document.getElementById('reason');
            if (reasonSelect) {
                reasonSelect.addEventListener('change', (e) => {
                    const otherField = document.getElementById('otherReason');
                    if (e.target.value === 'other') {
                        otherField.style.display = 'block';
                        otherField.required = true;
                    } else {
                        otherField.style.display = 'none';
                        otherField.required = false;
                    }
                });
            }

            // Form submission
            const selectionForm = document.getElementById('selectionForm');
            if (selectionForm) {
                selectionForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    if (this.validateForm()) {
                        this.collectFormData();
                        this.showSummary();
                        this.showPage('page2');
                    }
                });
            }

            // Admin form
            const adminForm = document.getElementById('adminForm');
            if (adminForm) {
                adminForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.addNewOrder();
                });
            }

            // Admin access (double-click logo)
            const logo = document.querySelector('.logo');
            if (logo) {
                logo.addEventListener('dblclick', () => {
                    this.showPage('adminPage');
                });
            }

            // Setup newsletter form
            this.setupNewsletterForm();

            // Setup discount modal listeners
            this.setupDiscountModalListeners();

            // Setup full album modal listeners
            this.setupFullAlbumModalListeners();

            // Privacy modal functionality
            this.setupPrivacyModal();

            // Expose global functions for onclick handlers
            window.loadRandomAudio = (playerNumber) => this.loadRandomAudio(playerNumber);
            window.showPage = (pageId) => this.showPage(pageId);
            window.goBack = () => this.goBack();
            window.processPayment = () => this.processPayment();
            window.applyDiscountCode = () => this.applyDiscountCode();
            window.submitDiscountEmail = () => this.submitDiscountEmail();
            window.copyDiscountCode = () => this.copyDiscountCode();
            window.applyDiscountAndClose = () => this.applyDiscountAndClose();
            window.deleteOrder = (id) => this.deleteOrder(id);
            window.exportToRTF = () => this.exportToRTF();
        },

        setupPrivacyModal: function() {
            const modal = document.getElementById('privacyModal');
            const link = document.getElementById('fullPrivacyLink');
            const closeBtn = document.querySelector('.close');

            if (link && modal && closeBtn) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                });

                closeBtn.addEventListener('click', () => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                });

                window.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                });
            }
        },

        setLanguage: function(lang) {
            currentLanguage = lang;
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.dataset.translate;
                if (translations[lang] && translations[lang][key]) {
                    element.textContent = translations[lang][key];
                }
            });
            
            // Handle placeholder translations
            document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
                const key = element.dataset.translatePlaceholder;
                if (translations[lang] && translations[lang][key]) {
                    element.placeholder = translations[lang][key];
                }
            });
            
            // Update random subheadline for new language
            this.setRandomSubheadline();
        },

        setRandomSubheadline: function() {
            const headlines = subheadlines[currentLanguage];
            const randomIndex = Math.floor(Math.random() * headlines.length);
            const selectedHeadline = headlines[randomIndex];
            
            const subheadlineElement = document.getElementById('randomSubheadline');
            if (subheadlineElement) {
                subheadlineElement.textContent = selectedHeadline;
                
                // Add a subtle animation
                subheadlineElement.style.opacity = '0';
                setTimeout(() => {
                    subheadlineElement.style.opacity = '1';
                }, 100);
            }
        },

        // Audio Management Functions
        loadRandomAudio: function(playerNumber) {
            if (mp3Files.length === 0) {
                console.error('No MP3 files available');
                return;
            }

            let availableFiles = mp3Files.slice(); // Copy the array
            
            // Remove currently playing file from the other player to avoid duplicates
            const otherPlayerIndex = playerNumber === 1 ? 2 : 1;
            if (currentlyPlaying[otherPlayerIndex - 1] !== null) {
                availableFiles = availableFiles.filter((_, index) => index !== currentlyPlaying[otherPlayerIndex - 1]);
            }

            // If only one file available and it's playing on the other player, allow duplicate
            if (availableFiles.length === 0) {
                availableFiles = mp3Files.slice();
            }

            // Select random file
            const randomIndex = Math.floor(Math.random() * availableFiles.length);
            const selectedFile = availableFiles[randomIndex];
            const originalIndex = mp3Files.indexOf(selectedFile);

            // Update tracking
            currentlyPlaying[playerNumber - 1] = originalIndex;

            // Update audio player
            const audioPlayer = document.getElementById(`audioPlayer${playerNumber}`);
            const audioTitle = document.getElementById(`audioTitle${playerNumber}`);
            const audioDesc = document.getElementById(`audioDesc${playerNumber}`);

            if (!audioPlayer || !audioTitle || !audioDesc) return;

            // Clear previous source
            audioPlayer.innerHTML = '';
            
            // Create new source element with the CDN URL
            const source = document.createElement('source');
            source.src = selectedFile.url; // Use the CDN URL directly
            source.type = 'audio/mpeg';
            audioPlayer.appendChild(source);

            // Add fallback text
            const fallback = document.createElement('span');
            fallback.setAttribute('data-translate', 'audioNotSupported');
            fallback.textContent = translations[currentLanguage].audioNotSupported;
            audioPlayer.appendChild(fallback);

            // Update title and description
            audioTitle.textContent = selectedFile.title[currentLanguage];
            audioDesc.textContent = selectedFile.style[currentLanguage];

            // Load the new audio
            audioPlayer.load();

            // Add loading animation
            audioTitle.style.opacity = '0.6';
            audioDesc.style.opacity = '0.6';
            
            // Reset opacity when loaded
            audioPlayer.addEventListener('loadeddata', function() {
                audioTitle.style.opacity = '1';
                audioDesc.style.opacity = '1';
            }, { once: true });

            // Handle loading errors
            audioPlayer.addEventListener('error', function(e) {
                console.error(`Error loading audio file: ${selectedFile.url}`, e);
                audioTitle.textContent = currentLanguage === 'nl' ? 'Fout bij laden' : 'Loading Error';
                audioDesc.textContent = currentLanguage === 'nl' ? 
                    'Bestand niet gevonden. Probeer een ander voorbeeld.' : 
                    'File not found. Try another example.';
                audioTitle.style.opacity = '1';
                audioDesc.style.opacity = '1';
            }, { once: true });
        },

        getVariantId: function(packageType) {
            return VARIANT_IDS[packageType] || null;
        },

        // FIXED: Process payment with enhanced duplicate prevention
        processPayment: function() {
            // FIXED: Enhanced duplicate submission prevention
            if (isProcessingPayment) {
                console.log('Payment already in progress, preventing duplicate submission');
                return;
            }

            // Validate customer details first
            if (!this.validateCustomerDetails()) {
                return;
            }

            // Set processing flag with timeout reset
            isProcessingPayment = true;
            clearTimeout(paymentTimeout);
            
            // Reset flag after 10 seconds as fallback
            paymentTimeout = setTimeout(() => {
                isProcessingPayment = false;
                console.log('Payment processing timeout - reset flag');
            }, 10000);

            // Collect customer details
            const customerForm = document.getElementById('customerDetailsForm');
            if (!customerForm) {
                isProcessingPayment = false;
                clearTimeout(paymentTimeout);
                return;
            }
            
            const customerData = new FormData(customerForm);
            const customerDetails = {};
            for (let [key, value] of customerData.entries()) {
                customerDetails[key] = value;
            }

            // Handle contact us option differently
            if (formData.package === 'contact') {
                this.handleContactRequest(customerDetails);
                return;
            }

            // For actual products, integrate with Shopify cart
            this.addToShopifyCart(customerDetails);
        },

        // FIXED: Separate contact request handling
        handleContactRequest: function(customerDetails) {
            alert(currentLanguage === 'nl' ? 
                'Bedankt voor uw interesse! We nemen binnen 24 uur contact met u op via e-mail voor een persoonlijk gesprek.' : 
                'Thank you for your interest! We will contact you within 24 hours via email for a personal consultation.');
            
            // Save contact request
            const contactRequest = {
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                customerName: `${customerDetails.firstName} ${customerDetails.middleName || ''} ${customerDetails.lastName}`.replace(/\s+/g, ' ').trim(),
                customerEmail: customerDetails.customerEmail,
                customerPhone: customerDetails.mobilePhone,
                deliveryMethod: 'email',
                package: 'Full Album Request',
                originalPrice: 'Contact',
                finalPrice: 'Contact',
                status: 'contact_request',
                orderData: formData,
                customerDetails: customerDetails
            };
            
            orders.push(contactRequest);
            localStorage.setItem('musicOrders', JSON.stringify(orders));
            
            // Reset processing flag and show page 1
            isProcessingPayment = false;
            clearTimeout(paymentTimeout);
            
            // Clear form data
            formData = {};
            
            this.showPage('page1');
        },

        // FIXED: Cart addition with better error handling and duplicate prevention
        addToShopifyCart: function(customerDetails) {
            const variantId = this.getVariantId(formData.package);
            
            if (!variantId) {
                console.error('No variant ID found for package:', formData.package);
                alert('Product configuration error. Please contact support.');
                isProcessingPayment = false;
                clearTimeout(paymentTimeout);
                return;
            }

            console.log('Adding to cart with variant ID:', variantId);

            // Prepare cart data - FIXED: Only include discount if actually applied
            const cartData = {
                items: [{
                    id: variantId,
                    quantity: 1,
                    properties: {
                        'Package': this.getPackageDisplayName(formData.package),
                        'Music Style 1': formData.musicStyle1,
                        'Music Style 2': formData.musicStyle2,
                        'Voice Type': formData.voiceType,
                        'Language': formData.songLanguage,
                        'Reason': formData.reason,
                        'Customer Name': `${customerDetails.firstName} ${customerDetails.lastName}`,
                        'Customer Email': customerDetails.customerEmail,
                        'Customer Phone': customerDetails.mobilePhone
                    }
                }]
            };

            // Add optional properties
            if (formData.artist1 || formData.artist2 || formData.artist3) {
                const artists = [formData.artist1, formData.artist2, formData.artist3].filter(a => a);
                cartData.items[0].properties['Favorite Artists'] = artists.join(', ');
            }

            // Include custom lyrics/story if provided
            if (formData.ownLyrics && formData.ownLyrics.trim()) {
                cartData.items[0].properties['Custom Lyrics/Story'] = formData.ownLyrics;
            }

            // Add words/names based on package
            if (formData.package === 'ep') {
                for (let song = 1; song <= 4; song++) {
                    const songWords = [];
                    for (let word = 1; word <= 3; word++) {
                        const wordValue = formData[`song${song}_word${word}`];
                        if (wordValue && wordValue.trim()) {
                            songWords.push(wordValue.trim());
                        }
                    }
                    if (songWords.length > 0) {
                        cartData.items[0].properties[`Song ${song} Words`] = songWords.join(', ');
                    }
                }
            } else if (formData.package === 'one') {
                const words = [formData.word1, formData.word2, formData.word3].filter(w => w && w.trim());
                if (words.length > 0) {
                    cartData.items[0].properties['Words/Names'] = words.join(', ');
                }
            }

            // FIXED: Only add discount if actually applied and valid
            if (appliedDiscountCode && (appliedDiscountCode === '15%MUSIC')) {
                cartData.items[0].properties['Discount Applied'] = appliedDiscountCode;
            }

            // Add to cart via Shopify API
            fetch('/cart/add.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Successfully added to cart:', data);
                
                // Reset processing flag
                isProcessingPayment = false;
                clearTimeout(paymentTimeout);
                
                // Clear form data
                formData = {};
                
                // Redirect to cart
                window.location.href = '/cart';
            })
            .catch(error => {
                console.error('Error adding to cart:', error);
                
                // Reset processing flag
                isProcessingPayment = false;
                clearTimeout(paymentTimeout);
                
                // Show user-friendly error
                if (error.message.includes('404')) {
                    alert(currentLanguage === 'nl' ? 
                        'Product niet gevonden. Controleer de product configuratie.' : 
                        'Product not found. Please check product configuration.');
                } else if (error.message.includes('422')) {
                    alert(currentLanguage === 'nl' ? 
                        'Product niet beschikbaar. Probeer het later opnieuw.' : 
                        'Product unavailable. Please try again later.');
                } else {
                    alert(currentLanguage === 'nl' ? 
                        'Er was een fout bij het toevoegen aan winkelwagen. Probeer het opnieuw.' : 
                        'There was an error adding to cart. Please try again.');
                }
            });
        },

        getPackageDisplayName: function(packageType) {
            const names = {
                'one': currentLanguage === 'nl' ? 'Één Liedje' : 'One Song',
                'ep': currentLanguage === 'nl' ? 'EP (4 liedjes)' : 'EP (4 songs)',
                'album': currentLanguage === 'nl' ? 'Volledig Album' : 'Full Album'
            };
            return names[packageType] || packageType;
        },

        updateSongTitles: function() {
            const selectedPackage = document.querySelector('input[name="package"]:checked');
            const titleContainer = document.getElementById('titleFields');
            const songTitlesSection = document.getElementById('songTitles');
            
            if (!titleContainer || !songTitlesSection) return;
            
            if (!selectedPackage || selectedPackage.value === 'contact') {
                songTitlesSection.classList.remove('show');
                return;
            }

            let numSongs;
            switch(selectedPackage.value) {
                case 'one': numSongs = 1; break;
                case 'ep': numSongs = 4; break;
                default: numSongs = 0;
            }

            titleContainer.innerHTML = '';
            for (let i = 1; i <= numSongs; i++) {
                const titleField = document.createElement('div');
                titleField.className = 'title-field';
                titleField.innerHTML = `<input type="text" name="songTitle${i}" placeholder="Song ${i} Title">`;
                titleContainer.appendChild(titleField);
            }

            songTitlesSection.classList.add('show');
        },

        updateWordsSection: function() {
            const selectedPackage = document.querySelector('input[name="package"]:checked');
            const wordsContainer = document.getElementById('wordsContainer');
            
            if (!wordsContainer) return;
            
            if (!selectedPackage || selectedPackage.value === 'contact') {
                wordsContainer.innerHTML = '';
                return;
            }

            wordsContainer.innerHTML = '';

            if (selectedPackage.value === 'ep') {
                // EP: 4 songs with 3 words each
                for (let song = 1; song <= 4; song++) {
                    const songSection = document.createElement('div');
                    songSection.className = 'song-words-section';
                    
                    const songTitle = document.createElement('div');
                    songTitle.className = 'song-words-title';
                    songTitle.textContent = `Song ${song} - Words/Names:`;
                    songSection.appendChild(songTitle);
                    
                    const wordsRow = document.createElement('div');
                    wordsRow.className = 'words-row';
                    
                    for (let word = 1; word <= 3; word++) {
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.name = `song${song}_word${word}`;
                        input.placeholder = `Word/Name ${word}`;
                        input.className = 'word-input';
                        wordsRow.appendChild(input);
                    }
                    
                    songSection.appendChild(wordsRow);
                    wordsContainer.appendChild(songSection);
                }
            } else {
                // Single song: 3 words
                const wordsRow = document.createElement('div');
                wordsRow.className = 'words-row';
                
                for (let i = 1; i <= 3; i++) {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.name = `word${i}`;
                    input.placeholder = `Word/Name ${i}`;
                    input.style.marginBottom = '10px';
                    wordsRow.appendChild(input);
                }
                
                wordsContainer.appendChild(wordsRow);
            }
        },

        validateForm: function() {
            let isValid = true;
            let missingFields = [];

            // Check package selection (radio buttons)
            const packageSelected = document.querySelector('input[name="package"]:checked');
            if (!packageSelected) {
                isValid = false;
                missingFields.push(currentLanguage === 'nl' ? 'Pakket selectie' : 'Package selection');
                document.querySelectorAll('input[name="package"]').forEach(radio => {
                    radio.closest('.radio-option').style.borderColor = '#ef4444';
                });
            } else {
                document.querySelectorAll('input[name="package"]').forEach(radio => {
                    radio.closest('.radio-option').style.borderColor = '#475569';
                });
            }

            // Check other required fields
            const requiredFields = [
                { name: 'musicStyle1', label: currentLanguage === 'nl' ? 'Eerste Muziekstijl' : 'First Music Style' },
                { name: 'musicStyle2', label: currentLanguage === 'nl' ? 'Tweede Muziekstijl' : 'Second Music Style' },
                { name: 'reason', label: currentLanguage === 'nl' ? 'Reden' : 'Reason' },
                { name: 'songLanguage', label: currentLanguage === 'nl' ? 'Liedje taal' : 'Song Language' }
            ];

            // Check voice selection (radio buttons)
            const voiceSelected = document.querySelector('input[name="voiceType"]:checked');
            if (!voiceSelected) {
                isValid = false;
                missingFields.push(currentLanguage === 'nl' ? 'Stem voorkeur' : 'Voice preference');
                document.querySelectorAll('input[name="voiceType"]').forEach(radio => {
                    radio.closest('.radio-option').style.borderColor = '#ef4444';
                });
            } else {
                document.querySelectorAll('input[name="voiceType"]').forEach(radio => {
                    radio.closest('.radio-option').style.borderColor = '#475569';
                });
            }

            requiredFields.forEach(field => {
                const element = document.querySelector(`[name="${field.name}"]`);
                if (!element || !element.value) {
                    isValid = false;
                    missingFields.push(field.label);
                    if (element) {
                        element.style.borderColor = '#ef4444';
                    }
                } else {
                    if (element) {
                        element.style.borderColor = '#475569';
                    }
                }
            });

            // Check if "other" reason is selected but not specified
            const reasonSelect = document.querySelector('[name="reason"]');
            const otherReasonField = document.getElementById('otherReason');
            if (reasonSelect && reasonSelect.value === 'other' && otherReasonField && (!otherReasonField.value || otherReasonField.value.trim() === '')) {
                isValid = false;
                missingFields.push(currentLanguage === 'nl' ? 'Andere reden specificatie' : 'Other reason specification');
                otherReasonField.style.borderColor = '#ef4444';
            }

            if (!isValid) {
                const message = currentLanguage === 'nl' ? 
                    'Vul de volgende verplichte velden in:\n• ' + missingFields.join('\n• ') :
                    'Please fill in the following required fields:\n• ' + missingFields.join('\n• ');
                alert(message);
            }

            return isValid;
        },

        collectFormData: function() {
            const form = document.getElementById('selectionForm');
            if (!form) return;
            
            formData = {};
            
            // Get package selection (radio button)
            const selectedPackage = document.querySelector('input[name="package"]:checked');
            if (selectedPackage) {
                formData.package = selectedPackage.value;
                if (selectedPackage.value === 'contact') {
                    formData.price = 'contact';
                } else {
                    formData.price = selectedPackage.dataset.price;
                }
            }
            
            // Get all other form data
            const formDataObj = new FormData(form);
            for (let [key, value] of formDataObj.entries()) {
                if (key !== 'package') { // We already handled package above
                    formData[key] = value;
                }
            }
        },

        // FIXED: Updated showSummary function to include lyrics/story
        showSummary: function() {
            const summaryContent = document.getElementById('summaryContent');
            const totalPrice = document.getElementById('totalPrice');
            
            if (!summaryContent || !totalPrice) return;
            
            let html = '<div class="summary-item"><div class="summary-label">Package:</div><div class="summary-value">';
            
            switch(formData.package) {
                case 'one': html += currentLanguage === 'nl' ? 'Één Liedje' : 'One Song'; break;
                case 'ep': html += currentLanguage === 'nl' ? 'EP (4 liedjes)' : 'EP (4 songs)'; break;
                case 'contact': html += currentLanguage === 'nl' ? 'Volledig Album' : 'Full Album'; break;
            }
            html += '</div></div>';

            html += `<div class="summary-item"><div class="summary-label">Music Style:</div><div class="summary-value">${formData.musicStyle1}, ${formData.musicStyle2}</div></div>`;
            html += `<div class="summary-item"><div class="summary-label">Language:</div><div class="summary-value">${formData.songLanguage}</div></div>`;
            
            // Display voice preference
            if (formData.voiceType) {
                let voiceLabel = '';
                switch(formData.voiceType) {
                    case 'male': voiceLabel = currentLanguage === 'nl' ? 'Mannelijke Stem' : 'Male Voice'; break;
                    case 'female': voiceLabel = currentLanguage === 'nl' ? 'Vrouwelijke Stem' : 'Female Voice'; break;
                    case 'no_preference': voiceLabel = currentLanguage === 'nl' ? 'Geen Voorkeur' : 'No Preference'; break;
                }
                html += `<div class="summary-item"><div class="summary-label">Voice:</div><div class="summary-value">${voiceLabel}</div></div>`;
            }
            
            if (formData.artist1 || formData.artist2 || formData.artist3) {
                html += '<div class="summary-item"><div class="summary-label">Favorite Artists:</div><div class="summary-value">';
                const artists = [formData.artist1, formData.artist2, formData.artist3].filter(a => a);
                html += artists.join(', ') + '</div></div>';
            }

            // Display words/names based on package type
            if (formData.package === 'ep') {
                // EP: Show words for each song
                for (let song = 1; song <= 4; song++) {
                    const songWords = [];
                    for (let word = 1; word <= 3; word++) {
                        const wordValue = formData[`song${song}_word${word}`];
                        if (wordValue && wordValue.trim()) {
                            songWords.push(wordValue.trim());
                        }
                    }
                    if (songWords.length > 0) {
                        html += `<div class="summary-item"><div class="summary-label">Song ${song} Words:</div><div class="summary-value">${songWords.join(', ')}</div></div>`;
                    }
                }
            } else if (formData.package === 'one') {
                // Single song: Show words
                const words = [formData.word1, formData.word2, formData.word3].filter(w => w && w.trim());
                if (words.length > 0) {
                    html += '<div class="summary-item"><div class="summary-label">Words/Names:</div><div class="summary-value">' + words.join(', ') + '</div></div>';
                }
            }

            // FIXED: Display custom lyrics/story if provided
            if (formData.ownLyrics && formData.ownLyrics.trim()) {
                const lyricsLabel = currentLanguage === 'nl' ? 'Eigen Teksten/Verhaal:' : 'Custom Lyrics/Story:';
                const lyricsText = formData.ownLyrics.trim();
                
                // Show a preview (first 200 characters) or full text if short
                let lyricsDisplay = lyricsText;
                if (lyricsText.length > 200) {
                    lyricsDisplay = lyricsText.substring(0, 200) + '...';
                }
                
                // Escape HTML and preserve line breaks
                lyricsDisplay = lyricsDisplay
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#39;')
                    .replace(/\n/g, '<br>');
                
                html += `<div class="summary-item">
                    <div class="summary-label">${lyricsLabel}</div>
                    <div class="summary-value lyrics-preview" style="font-style: italic; background: rgba(59, 130, 246, 0.1); padding: 8px 12px; border-radius: 8px; border-left: 3px solid #3b82f6; white-space: pre-wrap; font-size: 0.9rem; line-height: 1.4;">
                        ${lyricsDisplay}
                    </div>
                </div>`;
            }

            summaryContent.innerHTML = html;
            
            // Show/hide payment vs contact sections based on package type
            const paymentSection = document.getElementById('paymentSection');
            const contactSection = document.getElementById('contactSection');
            
            if (formData.package === 'contact') {
                if (paymentSection) paymentSection.style.display = 'none';
                if (contactSection) contactSection.style.display = 'block';
                totalPrice.innerHTML = '<div class="total-breakdown"><div class="total-row final"><span>Price:</span><span>' + 
                    (currentLanguage === 'nl' ? 'Neem contact op voor prijs' : 'Contact us for custom pricing') + '</span></div></div>';
            } else {
                if (paymentSection) paymentSection.style.display = 'block';
                if (contactSection) contactSection.style.display = 'none';
                
                // Pre-fill discount code if applied via modal
                if (localStorage.getItem('discountAppliedViaModal') === 'true') {
                    const codeInput = document.getElementById('discountCodeInput');
                    if (codeInput && !codeInput.value) {
                        codeInput.value = '15%MUSIC';
                        codeInput.disabled = true;
                        appliedDiscountCode = '15%MUSIC';
                        
                        const applyBtn = document.querySelector('.discount-apply-btn');
                        if (applyBtn) {
                            applyBtn.disabled = true;
                            applyBtn.style.opacity = '0.6';
                        }
                        
                        // Show success message
                        this.showDiscountMessage('success', 
                            (currentLanguage === 'nl' ? 'Korting succesvol toegepast! Je bespaart 15%' : 'Discount applied successfully! You save 15%'));
                    }
                }
                
                this.calculateTotal();
            }
        },

        // FIXED: Calculate total with proper discount logic
        calculateTotal: function() {
            // Skip calculation for contact packages
            if (formData.package === 'contact') {
                return;
            }
            
            const originalPrice = parseFloat(formData.price);
            if (isNaN(originalPrice)) {
                console.error('Invalid price:', formData.price);
                return;
            }
            
            let discountAmount = 0;
            
            // FIXED: Only apply discount if explicitly set and valid
            const hasValidDiscount = (
                (appliedDiscountCode === '15%MUSIC') || 
                (localStorage.getItem('discountAppliedViaModal') === 'true' && appliedDiscountCode === '15%MUSIC')
            );
            
            if (hasValidDiscount) {
                discountAmount = originalPrice * 0.15;
                window.appliedDiscount = discountAmount;
            } else {
                // Clear any stale discount data
                window.appliedDiscount = null;
                appliedDiscountCode = null;
            }
            
            const finalPrice = originalPrice - discountAmount;
            
            let totalHtml = '<div class="total-breakdown">';
            
            if (discountAmount > 0) {
                totalHtml += `<div class="total-row subtotal">
                    <span data-translate="subtotal">Subtotal:</span>
                    <span>€${originalPrice.toFixed(2)}</span>
                </div>`;
                totalHtml += `<div class="total-row discount">
                    <span data-translate="discount">Discount (15%):</span>
                    <span>-€${discountAmount.toFixed(2)}</span>
                </div>`;
                totalHtml += `<div class="total-row final">
                    <span data-translate="finalTotal">Total:</span>
                    <span>€${finalPrice.toFixed(2)}</span>
                </div>`;
            } else {
                totalHtml += `<div class="total-row final">
                    <span data-translate="finalTotal">Total:</span>
                    <span>€${originalPrice.toFixed(2)}</span>
                </div>`;
            }
            
            totalHtml += '</div>';
            
            const totalPriceElement = document.getElementById('totalPrice');
            if (totalPriceElement) {
                totalPriceElement.innerHTML = totalHtml;
            }
            
            // Update formData with final price
            formData.finalPrice = finalPrice.toFixed(2);
            formData.discountAmount = discountAmount.toFixed(2);
        },

        showPage: function(pageId) {
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
                // Always scroll to top when switching pages
                window.scrollTo(0, 0);
            }
        },

        // FIXED: Reset form and clear all state when going back
        goBack: function() {
            // Clear discount state
            clearDiscountState();
            
            // Reset processing flag
            isProcessingPayment = false;
            clearTimeout(paymentTimeout);
            
            // Clear form data
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                if (form.id !== 'selectionForm') {
                    form.reset();
                }
            });
            
            this.showPage('page1');
        },

        validateCustomerDetails: function() {
            const requiredFields = ['firstName', 'lastName', 'customerEmail', 'mobilePhone'];
            let isValid = true;
            let missingFields = [];

            // Check required text fields
            requiredFields.forEach(fieldName => {
                const field = document.getElementById(fieldName);
                if (!field || !field.value.trim()) {
                    isValid = false;
                    const label = field ? field.previousElementSibling.textContent : fieldName;
                    missingFields.push(label);
                    if (field) {
                        field.style.borderColor = '#ef4444';
                    }
                } else {
                    if (field) {
                        field.style.borderColor = '#475569';
                    }
                }
            });

            // Check terms and conditions agreement
            const termsCheckbox = document.getElementById('agreeTerms');
            const termsSection = document.querySelector('.terms-agreement-section');
            if (!termsCheckbox || !termsCheckbox.checked) {
                isValid = false;
                missingFields.push(currentLanguage === 'nl' ? 'Akkoord met voorwaarden' : 'Agreement with terms and conditions');
                if (termsSection) {
                    termsSection.style.borderColor = '#ef4444';
                    termsSection.style.background = 'rgba(239, 68, 68, 0.1)';
                }
            } else {
                if (termsSection) {
                    termsSection.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                    termsSection.style.background = 'rgba(15, 23, 42, 0.6)';
                }
            }

            // Validate email format
            const emailField = document.getElementById('customerEmail');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    missingFields.push(currentLanguage === 'nl' ? 'Geldig e-mailadres' : 'Valid email address');
                    emailField.style.borderColor = '#ef4444';
                }
            }

            if (!isValid) {
                const message = currentLanguage === 'nl' ? 
                    'Vul de volgende verplichte velden correct in:\n• ' + missingFields.join('\n• ') :
                    'Please fill in the following required fields correctly:\n• ' + missingFields.join('\n• ');
                alert(message);
            }

            return isValid;
        },

        // FIXED: Apply discount code with better validation
        applyDiscountCode: function() {
            const codeInput = document.getElementById('discountCodeInput');
            const messageDiv = document.getElementById('discountMessage');
            
            if (!codeInput || !messageDiv) return;
            
            const code = codeInput.value.trim().toUpperCase();
            
            // Reset previous messages
            messageDiv.className = 'discount-message';
            messageDiv.style.display = 'none';
            
            if (!code) {
                this.showDiscountMessage('error', currentLanguage === 'nl' ? 'Voer een geldige code in.' : 'Please enter a valid code.');
                return;
            }
            
            // Check if discount already applied
            if (appliedDiscountCode === '15%MUSIC') {
                this.showDiscountMessage('error', currentLanguage === 'nl' ? 'Kortingscode al toegepast.' : 'Discount code already applied.');
                return;
            }
            
            // Validate discount code
            if (code === '15%MUSIC') {
                const originalPrice = parseFloat(formData.price);
                if (isNaN(originalPrice)) {
                    this.showDiscountMessage('error', currentLanguage === 'nl' ? 'Geen geldige prijs gevonden.' : 'No valid price found.');
                    return;
                }
                
                const discountAmount = originalPrice * 0.15;
                window.appliedDiscount = discountAmount;
                appliedDiscountCode = code;
                
                this.showDiscountMessage('success', 
                    (currentLanguage === 'nl' ? 'Korting succesvol toegepast! Je bespaart €' : 'Discount applied successfully! You save €') + 
                    discountAmount.toFixed(2));
                
                // Recalculate total
                this.calculateTotal();
                
                // Disable input and button
                codeInput.disabled = true;
                const applyBtn = document.querySelector('.discount-apply-btn');
                if (applyBtn) {
                    applyBtn.disabled = true;
                    applyBtn.style.opacity = '0.6';
                }
                
            } else {
                this.showDiscountMessage('error', currentLanguage === 'nl' ? 'Ongeldige kortingscode.' : 'Invalid discount code.');
            }
        },

        showDiscountMessage: function(type, message) {
            const messageDiv = document.getElementById('discountMessage');
            if (messageDiv) {
                messageDiv.className = `discount-message ${type}`;
                messageDiv.textContent = message;
                messageDiv.style.display = 'block';
            }
        },

        // IMPORTANT: Discount Modal Functions - DISCOUNT ONLY, NO CART ACTIONS
        // These functions handle discount application but DO NOT add products to cart
        // Cart addition is handled separately in processPayment() function
        
        showDiscountModal: function() {
            const modal = document.getElementById('discountModal');
            if (modal) {
                // Reset to first step
                this.showDiscountStep('discountEmailStep');
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        },

        showDiscountStep: function(stepId) {
            // Hide all steps
            document.querySelectorAll('.discount-step').forEach(step => {
                step.classList.remove('active');
            });
            
            // Show the specified step
            const targetStep = document.getElementById(stepId);
            if (targetStep) {
                targetStep.classList.add('active');
            }
        },

        submitDiscountEmail: function() {
            const emailInput = document.getElementById('discountEmail');
            const consentCheckbox = document.getElementById('emailConsent');
            const consentSection = document.getElementById('emailConsentCheckbox');
            
            if (!emailInput || !consentCheckbox || !consentSection) return;
            
            const email = emailInput.value.trim();
            const hasConsent = consentCheckbox.checked;
            
            // Reset error states
            emailInput.style.borderColor = '';
            consentSection.classList.remove('error');
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                emailInput.style.borderColor = '#ef4444';
                emailInput.focus();
                alert(currentLanguage === 'nl' ? 
                    'Voer een geldig e-mailadres in.' : 
                    'Please enter a valid email address.');
                return;
            }
            
            // Validate consent
            if (!hasConsent) {
                consentSection.classList.add('error');
                alert(currentLanguage === 'nl' ? 
                    'U moet akkoord gaan met het ontvangen van e-mails om uw kortingscode te ontvangen.' : 
                    'You must agree to receive emails to get your discount code.');
                return;
            }
            
            // Store email and consent
            localStorage.setItem('discountEmail', email);
            localStorage.setItem('emailConsent', 'true');
            localStorage.setItem('discountAppliedViaModal', 'true');
            
            // Submit to email service
            this.submitEmailToShopify(email, 'discount_modal_consent');
            
            // Apply discount to current session
            appliedDiscountCode = '15%MUSIC';
            if (formData.price && formData.price !== 'contact') {
                const originalPrice = parseFloat(formData.price);
                window.appliedDiscount = originalPrice * 0.15;
            }
            
            // Show success step
            this.showDiscountStep('discountSuccessStep');
        },

        applyDiscountAndClose: function() {
            // ONLY apply discount - NO cart functionality
            appliedDiscountCode = '15%MUSIC';
            localStorage.setItem('discountAppliedViaModal', 'true');
            
            // Update discount field if it exists
            const codeInput = document.getElementById('discountCodeInput');
            if (codeInput) {
                codeInput.value = '15%MUSIC';
                codeInput.disabled = true;
                
                const applyBtn = document.querySelector('.discount-apply-btn');
                if (applyBtn) {
                    applyBtn.disabled = true;
                    applyBtn.style.opacity = '0.6';
                }
                
                // Show success message if on summary page
                this.showDiscountMessage('success', 
                    (currentLanguage === 'nl' ? 'Korting succesvol toegepast! Je bespaart 15%' : 'Discount applied successfully! You save 15%'));
                
                // Recalculate total if on summary page
                if (formData.price && formData.package !== 'contact') {
                    this.calculateTotal();
                }
            }
            
            // Close the modal
            this.closeDiscountModal();
            
            // Show a brief confirmation - DISCOUNT ONLY, no cart action
            const confirmMsg = currentLanguage === 'nl' ? 
                '✅ 15% korting toegepast! Vul je bestelling in en klik "Nu Betalen" om af te rekenen.' : 
                '✅ 15% discount applied! Complete your order and click "Pay Now" to checkout.';
            
            // Create a temporary notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
                color: #1e293b;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 8px 25px rgba(251, 191, 36, 0.3);
                z-index: 10000;
                font-weight: 600;
                animation: slideInRight 0.3s ease-out;
                max-width: 300px;
                text-align: center;
                line-height: 1.4;
            `;
            notification.textContent = confirmMsg;
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.remove();
            }, 3000);
        },

        closeDiscountModal: function() {
            const modal = document.getElementById('discountModal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Reset form
                const emailInput = document.getElementById('discountEmail');
                const consentCheckbox = document.getElementById('emailConsent');
                const consentSection = document.getElementById('emailConsentCheckbox');
                
                if (emailInput) emailInput.value = '';
                if (consentCheckbox) consentCheckbox.checked = false;
                if (consentSection) consentSection.classList.remove('error');
            }
        },

        copyDiscountCode: function() {
            const code = '15%MUSIC';
            
            // Try to copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(code).then(() => {
                    const button = document.querySelector('.copy-btn');
                    if (button) {
                        const originalText = button.textContent;
                        button.textContent = currentLanguage === 'nl' ? 'Gekopieerd!' : 'Copied!';
                        button.style.background = '#10b981';
                        
                        setTimeout(() => {
                            button.textContent = originalText;
                            button.style.background = '#fbbf24';
                        }, 2000);
                    }
                }).catch(() => {
                    // Fallback for older browsers
                    this.fallbackCopyTextToClipboard(code);
                });
            } else {
                // Fallback for older browsers
                this.fallbackCopyTextToClipboard(code);
            }
        },

        fallbackCopyTextToClipboard: function(text) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
            
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                alert(currentLanguage === 'nl' ? 'Code gekopieerd naar klembord!' : 'Code copied to clipboard!');
            } catch (err) {
                alert(currentLanguage === 'nl' ? 'Kon niet kopiëren, selecteer de code handmatig' : 'Could not copy, please select the code manually');
            }
            
            document.body.removeChild(textArea);
        },

        // Full Album Modal Functions
        showFullAlbumModal: function() {
            const modal = document.getElementById('fullAlbumModal');
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        },

        closeFullAlbumModal: function() {
            const modal = document.getElementById('fullAlbumModal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Reset form
                const form = document.getElementById('fullAlbumContactForm');
                if (form) {
                    form.reset();
                    // Reset the topic field to default value
                    const topicField = document.getElementById('fullAlbumTopic');
                    if (topicField) {
                        topicField.value = 'Interested in a full album please contact me';
                    }
                }
            }
        },

        handleFullAlbumContactSubmission: function() {
            const form = document.getElementById('fullAlbumContactForm');
            if (!form) return;
            
            const formData = new FormData(form);
            
            const email = formData.get('email');
            const phone = formData.get('phone');
            const topic = formData.get('topic');
            const notes = formData.get('notes');

            // Basic validation
            if (!email || !phone) {
                alert(currentLanguage === 'nl' ? 
                    'Vul alle verplichte velden in.' : 
                    'Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert(currentLanguage === 'nl' ? 
                    'Voer een geldig e-mailadres in.' : 
                    'Please enter a valid email address.');
                return;
            }

            // Save the contact request
            const contactRequest = {
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                customerName: 'Full Album Inquiry',
                customerEmail: email,
                customerPhone: phone,
                package: 'Full Album Contact Request',
                originalPrice: 'Contact',
                finalPrice: 'Contact',
                status: 'contact_request',
                topic: topic,
                notes: notes || '',
                source: 'full_album_modal'
            };
            
            orders.push(contactRequest);
            localStorage.setItem('musicOrders', JSON.stringify(orders));

            // Show success message
            alert(currentLanguage === 'nl' ? 
                'Bedankt voor uw interesse! We nemen binnen 24 uur contact met u op via e-mail voor een persoonlijk gesprek over uw volledige album.' : 
                'Thank you for your interest! We will contact you within 24 hours via email for a personal consultation about your full album.');

            // Close modal
            this.closeFullAlbumModal();
        },

        setupDiscountModalListeners: function() {
            // Discount modal functionality
            const discountModal = document.getElementById('discountModal');
            const discountCloseBtn = document.querySelector('.discount-close');

            // Close button
            if (discountCloseBtn) {
                discountCloseBtn.addEventListener('click', () => this.closeDiscountModal());
            }

            // Click outside modal to close
            if (discountModal) {
                discountModal.addEventListener('click', (e) => {
                    if (e.target === discountModal) {
                        this.closeDiscountModal();
                    }
                });
            }

            // ESC key to close modal
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && discountModal && discountModal.style.display === 'block') {
                    this.closeDiscountModal();
                }
            });
        },

        setupFullAlbumModalListeners: function() {
            // Full album modal functionality
            const fullAlbumModal = document.getElementById('fullAlbumModal');
            const fullAlbumCloseBtn = document.getElementById('fullAlbumClose');
            const fullAlbumForm = document.getElementById('fullAlbumContactForm');

            // Close button
            if (fullAlbumCloseBtn) {
                fullAlbumCloseBtn.addEventListener('click', () => this.closeFullAlbumModal());
            }

            // Click outside modal to close
            if (fullAlbumModal) {
                fullAlbumModal.addEventListener('click', (e) => {
                    if (e.target === fullAlbumModal) {
                        this.closeFullAlbumModal();
                    }
                });
            }

            // Form submission
            if (fullAlbumForm) {
                fullAlbumForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleFullAlbumContactSubmission();
                });
            }

            // ESC key to close modal
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && fullAlbumModal && fullAlbumModal.style.display === 'block') {
                    this.closeFullAlbumModal();
                }
            });
        },

        // Scroll trigger for discount popup - DISCOUNT ONLY, does not add to cart
        setupScrollTrigger: function() {
            // Wait a bit for DOM to be fully ready
            setTimeout(() => {
                const pricingSection = document.querySelector('.radio-group');
                
                if (pricingSection) {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting && !discountModalShown) {
                                this.showDiscountModal();
                                discountModalShown = true;
                            }
                        });
                    }, { 
                        threshold: 0.5,
                        rootMargin: '-50px 0px -50px 0px'
                    });

                    observer.observe(pricingSection);
                } else {
                    // Fallback: show modal after 3 seconds if pricing section not found
                    setTimeout(() => {
                        if (!discountModalShown) {
                            this.showDiscountModal();
                            discountModalShown = true;
                        }
                    }, 3000);
                }
            }, 500);
        },

        // Testimonial Carousel Functions
        setupTestimonialCarousel: function() {
            const carousel = document.getElementById('featuredTestimonials');
            const dots = document.querySelectorAll('.dot');
            let currentSlide = 0;
            let startX = 0;
            let isDragging = false;

            if (!carousel || dots.length === 0) return;

            // Dot navigation
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentSlide = index;
                    updateCarousel();
                });
            });

            // Touch events for swiping
            carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                isDragging = true;
                carousel.style.transition = 'none';
            });

            carousel.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
            });

            carousel.addEventListener('touchend', (e) => {
                if (!isDragging) return;
                isDragging = false;

                const endX = e.changedTouches[0].clientX;
                const diffX = startX - endX;
                const threshold = 50;

                if (Math.abs(diffX) > threshold) {
                    if (diffX > 0 && currentSlide < dots.length - 1) {
                        // Swipe left - next slide
                        currentSlide++;
                    } else if (diffX < 0 && currentSlide > 0) {
                        // Swipe right - previous slide
                        currentSlide--;
                    }
                }
                updateCarousel();
            });

            function updateCarousel() {
                // Only apply carousel on mobile
                if (window.innerWidth <= 768) {
                    // Each slide is 25% of the container width (since container is 400% wide with 4 slides)
                    const translateX = -currentSlide * 25;
                    carousel.style.transform = `translateX(${translateX}%)`;
                    carousel.style.transition = 'transform 0.3s ease';
                } else {
                    // Reset for desktop
                    carousel.style.transform = 'none';
                    carousel.style.transition = 'none';
                }

                // Update dots
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            }

            // Initialize and handle window resize
            updateCarousel();
            
            window.addEventListener('resize', () => {
                updateCarousel();
            });

            // Auto-hide swipe hint after first interaction
            let hintHidden = false;
            const hideHint = () => {
                if (!hintHidden) {
                    const hint = document.querySelector('.swipe-hint');
                    if (hint) {
                        hint.style.opacity = '0.4';
                        hint.style.fontSize = '0.75rem';
                    }
                    hintHidden = true;
                }
            };

            carousel.addEventListener('touchend', hideHint);
            dots.forEach(dot => dot.addEventListener('click', hideHint));
        },

        // Newsletter Functions
        setupNewsletterForm: function() {
            const newsletterForm = document.getElementById('newsletterForm');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleNewsletterSubmission();
                });
            }
        },

        handleNewsletterSubmission: function() {
            const emailInput = document.getElementById('newsletterEmail');
            if (!emailInput) return;
            
            const email = emailInput.value;
            
            if (!email || !email.includes('@')) {
                alert(currentLanguage === 'nl' ? 'Voer een geldig e-mailadres in.' : 'Please enter a valid email address.');
                return;
            }

            // Submit email to newsletter system
            this.submitEmailToNewsletter(email);
            
            // Show success message
            const button = document.querySelector('.newsletter-btn');
            if (button) {
                const originalText = button.textContent;
                button.textContent = currentLanguage === 'nl' ? 'Aangemeld! ✓' : 'Subscribed! ✓';
                button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                button.disabled = true;
                
                // Reset after 3 seconds
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)';
                    button.disabled = false;
                    emailInput.value = '';
                }, 3000);
            }
        },

        submitEmailToNewsletter: function(email) {
            // This is where you would integrate with your newsletter service
            console.log('Submitting email to newsletter:', email);
            
            // Also submit to Shopify as a lead
            this.submitEmailToShopify(email, 'newsletter');
        },

        submitEmailToShopify: function(email, source = 'discount_banner') {
            // This is where you would integrate with Shopify's API
            console.log('Submitting email to Shopify as lead:', email, 'Source:', source);
            
            // In a real implementation, you would make an API call like:
            // fetch('/api/shopify-lead', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email: email, source: source })
            // });
        },

        // Admin Functions
        addNewOrder: function() {
            const form = document.getElementById('adminForm');
            if (!form) return;
            
            const formDataObj = new FormData(form);
            
            const order = {
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                customerName: formDataObj.get('customerName'),
                customerEmail: formDataObj.get('customerEmail'),
                package: 'Custom',
                price: '0',
                status: formDataObj.get('orderStatus'),
                notes: formDataObj.get('notes')
            };
            
            orders.push(order);
            localStorage.setItem('musicOrders', JSON.stringify(orders));
            this.populateOrdersTable();
            form.reset();
            
            alert(currentLanguage === 'nl' ? 'Bestelling toegevoegd!' : 'Order added!');
        },

        populateOrdersTable: function() {
            const tbody = document.getElementById('ordersTableBody');
            if (!tbody) return;
            
            tbody.innerHTML = '';
            
            orders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.date}</td>
                    <td>${order.customerName}</td>
                    <td>${order.package}</td>
                    <td>€${order.price}</td>
                    <td>${order.status}</td>
                    <td>
                        <button onclick="deleteOrder(${order.id})" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                            ${currentLanguage === 'nl' ? 'Verwijderen' : 'Delete'}
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        },

        deleteOrder: function(id) {
            if (confirm(currentLanguage === 'nl' ? 'Weet je zeker dat je deze bestelling wilt verwijderen?' : 'Are you sure you want to delete this order?')) {
                orders = orders.filter(order => order.id !== id);
                localStorage.setItem('musicOrders', JSON.stringify(orders));
                this.populateOrdersTable();
            }
        },

        exportToRTF: function() {
            let rtfContent = '{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}';
            rtfContent += '\\f0\\fs24 MUSIC SERVICE ORDERS EXPORT\\par\\par';
            
            orders.forEach(order => {
                rtfContent += `Date: ${order.date}\\par`;
                rtfContent += `Customer: ${order.customerName}\\par`;
                rtfContent += `Email: ${order.customerEmail}\\par`;
                rtfContent += `Package: ${order.package}\\par`;
                rtfContent += `Price: €${order.price}\\par`;
                rtfContent += `Status: ${order.status}\\par`;
                if (order.notes) {
                    rtfContent += `Notes: ${order.notes}\\par`;
                }
                rtfContent += '\\par\\par';
            });
            
            rtfContent += '}';
            
            const blob = new Blob([rtfContent], { type: 'application/rtf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'music_orders_export.rtf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    // Export helper functions
    window.clearDiscountState = clearDiscountState;
    window.isProcessingPayment = () => isProcessingPayment;

    // Export the app to global scope
    window.MusicadoApp = MusicadoApp;

    // Auto-initialize if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => MusicadoApp.init());
    } else {
        MusicadoApp.init();
    }

})();
