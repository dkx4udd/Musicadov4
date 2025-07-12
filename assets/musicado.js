// Musicado Application JavaScript - Simplified Flow: Order → Cart → Finalize
(function() {
    'use strict';

    // Product Variant IDs
    const VARIANT_IDS = {
        'one': '52062844846413',      // One song
        'ep': '52062845796685',       // EP (4 songs)
        'album': '52062847467853'     // Full album
    };

    // Centralized state management
    const AppState = {
        discount: {
            applied: false,
            code: null,
            amount: 0,
            source: null // 'modal' or 'manual'
        },
        ui: {
            modalShown: false,
            currentLanguage: navigator.language.startsWith('nl') ? 'nl' : 'en'
        }
    };

    // Unique token generation
    const generateToken = () => Date.now() + '-' + Math.random().toString(36).substr(2, 9);

    // Translations (keeping existing translations)
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
            addToCart: "Add to Cart",
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
            addToCart: "Toevoegen aan Winkelwagen",
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
    let currentLanguage = AppState.ui.currentLanguage;
    let formData = {};
    let orders = JSON.parse(localStorage.getItem('musicOrders') || '[]');

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

    // State Management Functions
    const StateManager = {
        // Reset discount state
        resetDiscountState: function() {
            AppState.discount = {
                applied: false,
                code: null,
                amount: 0,
                source: null
            };
            
            localStorage.removeItem('discountAppliedViaModal');
            localStorage.removeItem('discountEmail');
            localStorage.removeItem('emailConsent');
        },

        // Apply discount with centralized state
        applyDiscount: function(code, source = 'manual') {
            if (AppState.discount.applied) {
                return { success: false, message: currentLanguage === 'nl' ? 'Korting al toegepast.' : 'Discount already applied.' };
            }

            if (code !== '15%MUSIC') {
                return { success: false, message: currentLanguage === 'nl' ? 'Ongeldige kortingscode.' : 'Invalid discount code.' };
            }

            AppState.discount = {
                applied: true,
                code: code,
                amount: 0, // Will be calculated on cart page
                source: source
            };

            if (source === 'modal') {
                localStorage.setItem('discountAppliedViaModal', 'true');
            }

            return { 
                success: true, 
                message: currentLanguage === 'nl' ? 'Korting toegepast! Dit wordt toegepast bij het afrekenen.' : 'Discount applied! This will be applied at checkout.'
            };
        }
    };

    // Main Application Object
    const MusicadoApp = {
        init: function() {
            console.log('Musicado App Initializing...');
            
            this.initializeLanguage();
            this.setupEventListeners();
            this.populateOrdersTable();
            this.setRandomSubheadline();
            
            // Load random audio files for both players
            this.loadRandomAudio(1);
            this.loadRandomAudio(2);
            
            // Initialize words section
            this.updateWordsSection();
            
            // Setup testimonial carousel
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

            // SIMPLIFIED: Form submission goes directly to cart
            const selectionForm = document.getElementById('selectionForm');
            if (selectionForm) {
                selectionForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    if (this.validateForm()) {
                        this.collectFormData();
                        this.addToCartAndRedirect();
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

            // Setup centralized button event handlers
            this.setupButtonEventHandlers();
        },

        setupButtonEventHandlers: function() {
            const buttonHandlers = {
                'loadRandomAudio1': () => this.loadRandomAudio(1),
                'loadRandomAudio2': () => this.loadRandomAudio(2),
                'copyDiscountCode': () => this.copyDiscountCode(),
                'applyDiscountAndClose': () => this.applyDiscountAndClose(),
                'submitDiscountEmail': () => this.submitDiscountEmail()
            };

            Object.entries(buttonHandlers).forEach(([id, handler]) => {
                const button = document.getElementById(id);
                if (button) {
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        handler();
                    });
                }
            });

            // Setup audio refresh buttons
            document.querySelectorAll('[onclick*="loadRandomAudio"]').forEach(button => {
                const playerNumber = button.onclick.toString().match(/loadRandomAudio\((\d+)\)/)?.[1];
                if (playerNumber) {
                    button.removeAttribute('onclick');
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.loadRandomAudio(parseInt(playerNumber));
                    });
                }
            });
        },

        setLanguage: function(lang) {
            currentLanguage = lang;
            AppState.ui.currentLanguage = lang;
            
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
            source.src = selectedFile.url;
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

        // SIMPLIFIED: Add to cart and redirect (no summary page)
        addToCartAndRedirect: function() {
            console.log('Adding to cart and redirecting...');

            try {
                // Handle contact us option differently
                if (formData.package === 'contact') {
                    this.handleContactRequest();
                    return;
                }

                // For actual products, integrate with Shopify cart
                this.addToShopifyCart();

            } catch (error) {
                console.error('Add to cart error:', error);
                alert(currentLanguage === 'nl' ? 
                    'Er is een fout opgetreden. Probeer het opnieuw.' : 
                    'An error occurred. Please try again.');
            }
        },

        // Handle contact request
        handleContactRequest: function() {
            try {
                const message = currentLanguage === 'nl' ? 
                    'Bedankt voor uw interesse! We nemen binnen 24 uur contact met u op via e-mail voor een persoonlijk gesprek.' : 
                    'Thank you for your interest! We will contact you within 24 hours via email for a personal consultation.';
                
                // Save contact request locally
                const contactRequest = {
                    id: Date.now(),
                    date: new Date().toLocaleDateString(),
                    customerName: 'Full Album Inquiry',
                    package: 'Full Album Request',
                    status: 'contact_request',
                    orderData: formData
                };
                
                orders.push(contactRequest);
                localStorage.setItem('musicOrders', JSON.stringify(orders));
                
                // Show success message
                alert(message);
                
                // Reset form and redirect to home
                this.resetForm();
                
            } catch (error) {
                console.error('Contact request error:', error);
                alert(currentLanguage === 'nl' ? 
                    'Er is een fout opgetreden bij het verzenden van uw verzoek.' : 
                    'An error occurred while sending your request.');
            }
        },

        // Add to Shopify cart with complete order data
        addToShopifyCart: function() {
            const variantId = this.getVariantId(formData.package);
            
            if (!variantId) {
                console.error('No variant ID found for package:', formData.package);
                alert('Product configuration error. Please contact support.');
                return;
            }

            console.log('Adding to cart with variant ID:', variantId);

            // Prepare cart data with all order information
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
                        'Reason': formData.reason
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

            // Add discount if applied
            if (AppState.discount.applied && AppState.discount.code === '15%MUSIC') {
                cartData.items[0].properties['Discount Applied'] = AppState.discount.code;
            }

            // Store order data in localStorage for cart page
            localStorage.setItem('musicOrderData', JSON.stringify(formData));

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
                
                // Show success message
                const successMessage = currentLanguage === 'nl' ? 
                    'Product toegevoegd aan winkelwagen! U wordt doorgestuurd...' :
                    'Product added to cart! Redirecting...';
                
                // Show brief success notification
                this.showSuccessNotification(successMessage);
                
                // Redirect to cart after short delay
                setTimeout(() => {
                    window.location.href = '/cart';
                }, 1500);
            })
            .catch(error => {
                console.error('Error adding to cart:', error);
                
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

        showSuccessNotification: function(message) {
            // Create success notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
                z-index: 10000;
                font-weight: 600;
                animation: slideInRight 0.3s ease-out;
                max-width: 300px;
                text-align: center;
                line-height: 1.4;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            // Remove notification after delay
            setTimeout(() => {
                notification.remove();
            }, 2000);
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
                formData.price = selectedPackage.dataset.price;
            }
            
            // Get all other form data
            const formDataObj = new FormData(form);
            for (let [key, value] of formDataObj.entries()) {
                if (key !== 'package') { // We already handled package above
                    formData[key] = value;
                }
            }
        },

        resetForm: function() {
            const form = document.getElementById('selectionForm');
            if (form) {
                form.reset();
                
                // Reset radio button styles
                document.querySelectorAll('.radio-option').forEach(opt => opt.classList.remove('selected'));
                
                // Reset words section
                this.updateWordsSection();
                
                // Hide song titles section
                const songTitlesSection = document.getElementById('songTitles');
                if (songTitlesSection) {
                    songTitlesSection.classList.remove('show');
                }
                
                // Hide other reason field
                const otherReasonField = document.getElementById('otherReason');
                if (otherReasonField) {
                    otherReasonField.style.display = 'none';
                    otherReasonField.required = false;
                }
            }
        },

        showPage: function(pageId) {
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
                window.scrollTo(0, 0);
            }
        },

        // Discount Modal Functions
        showDiscountModal: function() {
            // Don't show modal if already shown or discount already applied
            if (AppState.ui.modalShown || AppState.discount.applied) {
                return;
            }
            
            const modal = document.getElementById('discountModal');
            if (modal) {
                // Reset to first step
                this.showDiscountStep('discountEmailStep');
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                AppState.ui.modalShown = true;
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
            
            // Submit to email service
            this.submitEmailToShopify(email, 'discount_modal_consent');
            
            // Apply discount using centralized state
            const result = StateManager.applyDiscount('15%MUSIC', 'modal');
            if (result.success) {
                // Show success step
                this.showDiscountStep('discountSuccessStep');
            } else {
                console.error('Failed to apply discount from modal:', result.message);
            }
        },

        applyDiscountAndClose: function() {
            // Apply discount
            const result = StateManager.applyDiscount('15%MUSIC', 'modal');
            
            if (result.success) {
                // Close the modal
                this.closeDiscountModal();
                
                // Show confirmation message
                const confirmMsg = currentLanguage === 'nl' ? 
                    '✅ 15% korting toegepast! Vul je bestelling in en voeg toe aan winkelwagen.' : 
                    '✅ 15% discount applied! Complete your order and add to cart.';
                
                // Create temporary notification
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
            }
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
                    this.fallbackCopyTextToClipboard(code);
                });
            } else {
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

        // Scroll trigger for discount popup
        setupScrollTrigger: function() {
            // Wait a bit for DOM to be fully ready
            setTimeout(() => {
                const pricingSection = document.querySelector('.radio-group');
                
                if (pricingSection) {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting && !AppState.ui.modalShown && !AppState.discount.applied) {
                                this.showDiscountModal();
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
                        if (!AppState.ui.modalShown && !AppState.discount.applied) {
                            this.showDiscountModal();
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
            console.log('Submitting email to newsletter:', email);
            this.submitEmailToShopify(email, 'newsletter');
        },

        submitEmailToShopify: function(email, source = 'discount_banner') {
            console.log('Submitting email to Shopify as lead:', email, 'Source:', source);
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

    // Export only essential functions to global scope
    window.MusicadoApp = MusicadoApp;
    window.StateManager = StateManager;

    // Export helper functions for backward compatibility
    window.loadRandomAudio = (playerNumber) => MusicadoApp.loadRandomAudio(playerNumber);
    window.showPage = (pageId) => MusicadoApp.showPage(pageId);
    window.deleteOrder = (id) => MusicadoApp.deleteOrder(id);
    window.exportToRTF = () => MusicadoApp.exportToRTF();

    // Auto-initialize if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => MusicadoApp.init());
    } else {
        MusicadoApp.init();
    }

})();
