// FINAL Musicado Application JavaScript - CORS FIXED KLAVIYO INTEGRATION + CONSOLE ERROR FIXES
(function() {
    'use strict';

    // Product Variant IDs
    const VARIANT_IDS = {
        'one': '52062844846413',      // One song
        'ep': '52062845796685',       // EP (4 songs)
        'album': '52062847467853'     // Full album
    };

    // CRITICAL: Language persistence key
    const LANGUAGE_KEY = 'musicado_language';

    // Language persistence functions - ENFORCED DUTCH DEFAULT
    function saveLanguagePreference(lang) {
        // Only save valid languages
        if (lang === 'nl' || lang === 'en') {
            localStorage.setItem(LANGUAGE_KEY, lang);
            console.log('💾 Language preference saved:', lang);
        } else {
            console.warn('⚠️ Invalid language, not saving:', lang);
        }
    }

    // FIXED: Robust Dutch Default - Enforced for all new visitors
    function getSavedLanguagePreference() {
        const saved = localStorage.getItem(LANGUAGE_KEY);
        if (saved && (saved === 'nl' || saved === 'en')) {
            console.log('📱 Found valid saved language preference:', saved);
            return saved;
        }
        
        // Clear any invalid saved preference
        if (saved && saved !== 'nl' && saved !== 'en') {
            console.log('⚠️ Invalid saved language, clearing:', saved);
            localStorage.removeItem(LANGUAGE_KEY);
        }
        
        // ENFORCED: Always default to Dutch for new visitors
        // No browser detection, no timezone detection - just Dutch
        console.log('🇳🇱 No valid saved preference, enforcing Dutch default for all visitors');
        return 'nl';
    }

    // Get saved language for initialization - ENFORCED DUTCH DEFAULT
    const savedLang = getSavedLanguagePreference();

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
            currentLanguage: savedLang // Use saved language (Dutch default)
        }
    };

    // Unique token generation
    const generateToken = () => Date.now() + '-' + Math.random().toString(36).substr(2, 9);

    // COMPLETE Translations including cart-specific translations
    // REORDERED: Dutch first, English second
    const translations = {
        nl: {
            intro: "Welkom bij onze professionele muziekcreatie service! Kies uw pakket en laat ons aangepaste liedjes voor u maken. Niet tevreden? 100% geld terug garantie!!!",
            mainIntro: "Het is muziek, maar persoonlijk",
            introDescription: "Tot 3x goedkoper dan een klein flesje parfum",
            listenExamples: "Luister naar onze voorbeelden",
            whyChooseUsTitle: "Waarom voor ons kiezen",
            whyItem1Title: "Professionele Songwriters",
            whyItem1Text: "Ervaren songwriters die uw verhaal omzetten in prachtige teksten",
            whyItem2Title: "Professionele Muziek Producent",
            whyItem2Text: "Top producenten zorgen voor studio-kwaliteit opnames",
            whyItem3Title: "Spotify Publicatie",
            whyItem3Text: "Mogelijkheid om uw muziek op Spotify te zetten",
            whyItem4Title: "Persoonlijk Contact",
            whyItem4Text: "Persoonlijk contact als uw muzikale wens niet duidelijk is",
            whyItem5Title: "Gratis Revisie",
            whyItem5Text: "Gratis 1 revisie om het perfect te maken",
            whyItem6Title: "Geld Terug Garantie",
            whyItem6Text: "Niet tevreden? 100% geld terug",
            whyItem7Title: "Snelle Levering",
            whyItem7Text: "Uw persoonlijke nummer binnen 48 uur in uw mailbox",
            whyItem8Title: "100% Persoonlijk",
            whyItem8Text: "Elk nummer is uniek gemaakt met uw eigen woorden en verhaal",
            swipeToExplore: "← Veeg om meer te zien →",
            example1Title: "Laden...",
            example1Description: "Willekeurig voorbeeld uit onze collectie",
            example2Title: "Laden...",
            example2Description: "Willekeurig voorbeeld uit onze collectie", 
            playAnother: "🔄 Speel Ander Voorbeeld",
            audioNotSupported: "Uw browser ondersteunt het audio element niet.",
            featuredTestimonial1: '"Ik ga stuk. Mijn mams vond de tekst: Met Soesje op pad (Soesje is onze hond) echt superleuk en ze zingt het de hele dag!"',
            featuredTestimonial2: '"Moet zeggen dat ik eerst niet blij was. Na gesproken te hebben met de klantenservice, supergoed geholpen. En mijn collega was ook blij met het nummer. bedankt Musicado"',
            featuredTestimonial3: '"Top! Mijn vrouw vond het leuk. Beter dan bloemen."',
            featuredTestimonial4: '"Geweldige kwaliteit en super snelle levering! Ik bestelde een verrassingsliedje voor mijn vriendin en het werd ongelooflijk. De teksten waren precies wat ik wilde zeggen."',
            swipeHint: "← Veeg voor meer reviews →",
            successBanner: "Meer dan 500 luisteraars en tevreden muziekgenieters!",
            buyNow: "Nu Kopen",
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
            ourTotal: "Vanaf slechts €49",
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
            ownLyrics: "Heeft u uw eigen teksten of een verhaal over het liedje, geef ons alle details: Voer hier in:",
            enterLyricsPlaceholder: "Het is belangrijk (bij voorkeur chronologisch) uw verhaal te doen, wat wilt u in het liedje terug horen. Vul zo uitgebreid mogelijk in. Namen gebruiken mag.",
            addToCart: "Toevoegen aan Winkelwagen",
            discountTitle: "🎵 Krijg 15% KORTING op uw aankoop!",
            discountEmailDescription: "Voer uw e-mailadres in om 15% korting te krijgen op uw aangepaste liedjescreatie!",
            discountEmailPlaceholder: "Voer uw e-mailadres in",
            emailConsentText: "Ik ga akkoord met het ontvangen van promotionele e-mails en speciale aanbiedingen van musicado. U kunt zich op elk moment uitschrijven.",
            getDiscount: "Krijg Mijn 15% Korting",
            sending: "Verzenden...",
            subscribing: "Aanmelden...",
            errorTryAgain: "Fout - Probeer opnieuw",
            discountTermsPrivacy: "We respecteren uw privacy. Geen spam, en u kunt zich altijd uitschrijven.",
            discountSuccessTitle: "🎉 Bedankt!",
            discountSuccessMessage: "Controleer uw e-mail om uw 15% korting te ontvangen",
            discountValidityInfo: "Deze code is 30 dagen geldig. Bewaar hem voor uw bestelling!",
            copyCode: "Kopieer Code",
            codeCopied: "Code Gekopieerd!",
            continueToCheckout: "Venster Sluiten",
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
            actions: "Acties",

            // CART-SPECIFIC TRANSLATIONS IN DUTCH
            cartPageTitle: "Uw Bestelling",
            orderSummary: "Bestelling Overzicht",
            removeItem: "Item Verwijderen", 
            subtotal: "Subtotaal:",
            discountApplied: "Korting",
            total: "Totaal:",
            taxNote: "Belastingen en verzendkosten worden berekend bij het afrekenen",
            customerInformation: "Klantgegevens",
            firstName: "Voornaam *",
            middleName: "Tussenvoegsel",
            lastName: "Achternaam *",
            musicDeliveryTitle: "📧 Muziek Levering Informatie",
            musicDeliveryDescription: "We sturen u binnen 24 uur een link via e-mail naar uw persoonlijke pagina waar u uw muziek kunt downloaden.",
            discountCodeTitle: "Kortingscode",
            discountCodePlaceholder: "Voer kortingscode in",
            applyDiscount: "Toepassen",
            discountHelp: "💡 Heeft u een kortingscode? Voer deze hier in om korting te krijgen op uw bestelling!",
            discountAppliedSuccess: "Korting toegepast!",
            agreeTerms: "Ik ga akkoord met de algemene voorwaarden en privacybeleid",
            privacyPolicyLink: "Lees ons privacybeleid",
            importantInformation: "Belangrijke Informatie",
            deliveryInfo: "U ontvangt binnen 24 uur een email met het door u gekozen product",
            personalUseInfo: "Liedjes zijn alleen voor persoonlijk gebruik (neem contact op voor commercieel gebruik)",
            spotifyInfo: "We kunnen uw liedje op verzoek op Spotify publiceren",
            contactInfo: "Vragen? Neem contact met ons op:",
            completeOrderPay: "Bestelling Voltooien & Betalen",
            processing: "Verwerken...",
            continueShopping: "Verder Winkelen",
            tryAgain: "Probeer Opnieuw",
            emptyCartTitle: "Uw winkelwagen is leeg",
            emptyCartDescription: "U heeft nog geen items aan uw winkelwagen toegevoegd.",
            startShopping: "Begin met Winkelen",
            
            // Validation messages in Dutch
            pleaseComplete: "Vul de volgende verplichte velden in:",
            validEmail: "Geldig e-mailadres",
            agreeToTerms: "Akkoord met algemene voorwaarden",
            enterDiscountCode: "Voer een kortingscode in.",
            invalidDiscountCode: "Ongeldige kortingscode. Controleer en probeer opnieuw.",
            agreeToEmails: "U moet akkoord gaan met het ontvangen van e-mails om uw kortingscode te ontvangen.",
            discountAlreadyApplied: "Korting al toegepast.",
            discountAppliedMessage: "Korting toegepast! Dit wordt toegepast bij het afrekenen.",
            orderUpdated: "Bestelling bijgewerkt! Doorverwijzen naar afrekenen...",
            processingError: "Er is een fout opgetreden. Probeer het opnieuw.",
            updateError: "Kan bestellingsinformatie niet bijwerken. Probeer het opnieuw.",
            
            // Cart button translations
            viewCart: "Bekijk Winkelwagen",
            cartEmpty: "Winkelwagen Leeg", 
            itemsInCart: "items in winkelwagen"
        },
        en: {
            intro: "Welcome to our professional music creation service! Choose your package and let us create custom songs just for you, -	100% moneyback Guarantee",
            mainIntro: "It's music, but personal",
            introDescription: "Up to 3x cheaper than a small bottle of perfume",
            listenExamples: "Listen to our examples",
            whyChooseUsTitle: "Why Choose Us",
            whyItem1Title: "Professional Songwriters",
            whyItem1Text: "Experienced songwriters who turn your story into beautiful lyrics",
            whyItem2Title: "Professional Music Producer",
            whyItem2Text: "Top producers ensure studio-quality recordings",
            whyItem3Title: "Spotify Publishing",
            whyItem3Text: "Option to publish your music on Spotify",
            whyItem4Title: "Personal Contact",
            whyItem4Text: "Personal contact when your musical wish is not clear",
            whyItem5Title: "Free Revision",
            whyItem5Text: "Free 1 revision to make it perfect",
            whyItem6Title: "Money Back Guarantee",
            whyItem6Text: "Not satisfied? 100% money back",
            whyItem7Title: "Fast Delivery",
            whyItem7Text: "Your personal song in your mailbox within 48 hours",
            whyItem8Title: "100% Personal",
            whyItem8Text: "Each song is uniquely made with your own words and story",
            swipeToExplore: "← Swipe to see more →",
            example1Title: "Loading...",
            example1Description: "Random example from our collection",
            example2Title: "Loading...", 
            example2Description: "Random example from our collection",
            playAnother: "🔄 Play Another Example",
            audioNotSupported: "Your browser does not support the audio element.",
            featuredTestimonial1: '"I\'m dying laughing. My mom loved the lyrics: Walking with Soesje (Soesje is our dog) she absolutely loved it and she sings it all day long!"',
            featuredTestimonial2: '"I must say I wasn\'t happy at first. After speaking with customer service, they helped me really well. And my colleague was also happy with the song. Thanks Musicado"',
            featuredTestimonial3: '"Great! My wife loved it. Better than flowers."',
            featuredTestimonial4: '"Amazing quality and super fast delivery! I ordered a surprise song for my girlfriend and it turned out incredible. The lyrics were exactly what I wanted to say."',
            swipeHint: "← Swipe for more reviews →",
            successBanner: "More than 500 listeners and satisfied music lovers!",
            buyNow: "Buy Now",
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
            ourTotal: "Starting at just €49",
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
            ownLyrics: "Do you have your own lyrics or a story about the song?: Enter here and dont leave out any details!:",
            enterLyricsPlaceholder: "It's important to tell your story (preferably chronologically), what do you want to hear in the song. Fill in as extensively as possible. Using names is allowed.",
            addToCart: "Add to Cart",
            discountTitle: "🎵 Get 15% OFF Your Purchase!",
            discountEmailDescription: "Enter your email to unlock 15% off your custom song creation!",
            discountEmailPlaceholder: "Enter your email address",
            emailConsentText: "I agree to receive promotional emails and special offers from musicado. You can unsubscribe at any time.",
            getDiscount: "Get My 15% Discount",
            sending: "Sending...",
            subscribing: "Subscribing...",
            errorTryAgain: "Error - Try again",
            discountTermsPrivacy: "We respect your privacy. No spam, and you can unsubscribe anytime.",
            discountSuccessTitle: "🎉 Thank You!",
            discountSuccessMessage: "Check your email to get your 15% discount",
            discountValidityInfo: "This code is valid for 30 days. Save it for your order!",
            copyCode: "Copy Code",
            codeCopied: "Code Copied!",
            continueToCheckout: "Close Window",
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
            actions: "Actions",

            // CART-SPECIFIC TRANSLATIONS
            cartPageTitle: "Your Order",
            orderSummary: "Order Summary", 
            removeItem: "Remove Item",
            subtotal: "Subtotal:",
            discountApplied: "Discount",
            total: "Total:",
            taxNote: "Taxes and shipping calculated at checkout",
            customerInformation: "Customer Information",
            firstName: "First Name *",
            middleName: "Middle Name",
            lastName: "Last Name *",
            musicDeliveryTitle: "📧 Music Delivery Information",
            musicDeliveryDescription: "We will send you a link via email to your personal page where you can download your music within 24 hours.",
            discountCodeTitle: "Discount Code",
            discountCodePlaceholder: "Enter discount code",
            applyDiscount: "Apply",
            discountHelp: "💡 Have a discount code? Enter it here to save on your order!",
            discountAppliedSuccess: "Discount applied!",
            agreeTerms: "I agree with the terms and conditions and privacy policy",
            privacyPolicyLink: "Read our privacy policy",
            importantInformation: "Important Information",
            deliveryInfo: "You will receive an email link to download your music within 24 hours",
            personalUseInfo: "Songs are for personal use only (contact us for commercial use)",
            spotifyInfo: "We can publish your song on Spotify upon request",
            contactInfo: "Any questions? Contact us at:",
            completeOrderPay: "Complete Order & Pay",
            processing: "Processing...",
            continueShopping: "Continue Shopping",
            tryAgain: "Try Again",
            emptyCartTitle: "Your cart is empty",
            emptyCartDescription: "You haven't added any items to your cart yet.",
            startShopping: "Start Shopping",
            
            // Validation messages
            pleaseComplete: "Please complete the following:",
            validEmail: "Valid email address",
            agreeToTerms: "Agreement with terms and conditions",
            enterDiscountCode: "Please enter a discount code.",
            invalidDiscountCode: "Invalid discount code. Please check and try again.",
            agreeToEmails: "You must agree to receive emails to get your discount code.",
            discountAlreadyApplied: "Discount already applied.",
            discountAppliedMessage: "Discount applied! This will be applied at checkout.",
            orderUpdated: "Order updated! Redirecting to checkout...",
            processingError: "An error occurred. Please try again.",
            updateError: "Failed to update order information. Please try again.",
            
            // Cart button translations
            viewCart: "View Cart",
            cartEmpty: "Cart Empty",
            itemsInCart: "items in cart"
        }
    };

    // Global variables - UPDATED to use saved language (Dutch default)
    let currentLanguage = savedLang;
    let formData = {};
    let orders = JSON.parse(localStorage.getItem('musicOrders') || '[]');

    // MP3 files - Updated with actual Shopify CDN URLs
    const mp3Files = [
        { 
            url: "https://cdn.shopify.com/s/files/1/0905/1462/0749/files/Deeper_Than_the_Sky_alternative.mp3", 
            title: { en: "Deeper Than the Sky (Alternative)", nl: "Dieper Dan de Lucht (Alternatief)" },
            style: { en: "Alternative/Indie style", nl: "Alternative/Indie stijl" }
        },
        { 
            url: "https://cdn.shopify.com/s/files/1/0905/1462/0749/files/Deeper_Than_the_Sky.mp3", 
            title: { en: "Deeper Than the Sky", nl: "Dieper Dan de Lucht" },
            style: { en: "Pop/Rock style", nl: "Pop/Rock stijl" }
        },
        { 
            url: "https://cdn.shopify.com/s/files/1/0905/1462/0749/files/Kan_Je_Mij_Vergeven.mp3", 
            title: { en: "Can You Forgive Me", nl: "Kan Je Mij Vergeven" },
            style: { en: "Emotional Ballad style", nl: "Emotionele Ballad stijl" }
        },
        { 
            url: "https://cdn.shopify.com/s/files/1/0905/1462/0749/files/chillen_op_vakantie_in_Tunesie.mp3", 
            title: { en: "Chilling on Holiday in Tunisia", nl: "Chillen op Vakantie in Tunesië" },
            style: { en: "Summer/Vacation style", nl: "Zomer/Vakantie stijl" }
        }
    ];

    // Track which files are currently playing to avoid duplicates
    let currentlyPlaying = [null, null];

    // Subheadline arrays - REORDERED: Dutch first
    const subheadlines = {
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
        ],
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

            // Let Shopify handle discount code validation - accept any non-empty code
            if (!code || code.trim() === '') {
                return { success: false, message: currentLanguage === 'nl' ? 'Voer een kortingscode in.' : 'Please enter a discount code.' };
            }

            AppState.discount = {
                applied: true,
                code: code.trim(),
                amount: 0, // Will be calculated by Shopify during checkout
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

    // Copy to clipboard function
    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            // Modern clipboard API
            return navigator.clipboard.writeText(text).then(() => {
                return true;
            }).catch(() => {
                return fallbackCopyToClipboard(text);
            });
        } else {
            // Fallback for older browsers
            return Promise.resolve(fallbackCopyToClipboard(text));
        }
    }

    function fallbackCopyToClipboard(text) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.top = '-9999px';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            return successful;
        } catch (err) {
            console.error('Fallback copy failed:', err);
            return false;
        }
    }

    // Main Application Object
    const MusicadoApp = {
        currentLanguage: currentLanguage, // Expose current language for cart page

        init: function() {
            console.log('Musicado App Initializing with enforced Dutch default language:', currentLanguage);
            
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
            
            // CRITICAL: Ensure discount modal is properly initialized
            this.initializeDiscountModal();
        },

        // UPDATED: Initialize language with enforced Dutch default
        initializeLanguage: function() {
            // Use enforced Dutch default from getSavedLanguagePreference
            const enforcedLang = getSavedLanguagePreference();
            console.log('🎯 Initializing with enforced Dutch default language:', enforcedLang);
            
            this.setLanguage(enforcedLang);
            
            // Set Dutch button as active by default
            const activeBtn = document.querySelector(`[data-lang="${enforcedLang}"]`);
            if (activeBtn) {
                // Remove active from all buttons first
                document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
                // Add active to current language
                activeBtn.classList.add('active');
                console.log('✅ Active language button set for:', enforcedLang);
            } else {
                // Fallback: make Dutch button active if no button found
                const nlButton = document.querySelector('[data-lang="nl"]');
                if (nlButton) {
                    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
                    nlButton.classList.add('active');
                    console.log('✅ Fallback: Dutch button set as active');
                }
            }
        },

        setupEventListeners: function() {
            // Language switcher - UPDATED with saving
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

            // Form submission goes directly to cart
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
                'loadRandomAudio2': () => this.loadRandomAudio(2)
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

        // UPDATED: setLanguage function with persistence and validation
        setLanguage: function(lang) {
            // Validate language before setting
            if (lang !== 'nl' && lang !== 'en') {
                console.warn('⚠️ Invalid language attempted:', lang, '- keeping current:', currentLanguage);
                return;
            }
            
            currentLanguage = lang;
            this.currentLanguage = lang; // Update the exposed property for cart page
            AppState.ui.currentLanguage = lang;
            
            // CRITICAL: Save language preference for persistence across pages
            saveLanguagePreference(lang);
            
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
            
            // Update cart button if it exists
            if (typeof updateCartButton === 'function') {
                updateCartButton();
            }
            
            console.log('✅ Language set and saved:', lang);
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

        // Add to cart and redirect
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

        // FIXED: Add to Shopify cart with proper error handling and data validation
        addToShopifyCart: function() {
            const variantId = this.getVariantId(formData.package);
            
            if (!variantId) {
                console.error('No variant ID found for package:', formData.package);
                alert('Product configuration error. Please contact support.');
                return;
            }

            console.log('Adding to cart with variant ID:', variantId);
            console.log('Form data:', formData);

            // FIXED: Clean and validate properties before sending
            const cleanProperties = {};
            
            // Only add properties that have actual values
            if (formData.package) {
                cleanProperties['Package'] = this.getPackageDisplayName(formData.package);
            }
            if (formData.musicStyle1) {
                cleanProperties['Music Style 1'] = formData.musicStyle1;
            }
            if (formData.musicStyle2) {
                cleanProperties['Music Style 2'] = formData.musicStyle2;
            }
            if (formData.voiceType) {
                cleanProperties['Voice Type'] = formData.voiceType;
            }
            if (formData.songLanguage) {
                cleanProperties['Language'] = formData.songLanguage;
            }
            if (formData.reason) {
                cleanProperties['Reason'] = formData.reason === 'other' ? formData.otherReason || 'Other' : formData.reason;
            }

            // Add optional properties only if they exist
            const artists = [];
            if (formData.artist1 && formData.artist1.trim()) artists.push(formData.artist1.trim());
            if (formData.artist2 && formData.artist2.trim()) artists.push(formData.artist2.trim());
            if (formData.artist3 && formData.artist3.trim()) artists.push(formData.artist3.trim());
            if (artists.length > 0) {
                cleanProperties['Favorite Artists'] = artists.join(', ');
            }

            // Include custom lyrics/story if provided
            if (formData.ownLyrics && formData.ownLyrics.trim()) {
                cleanProperties['Custom Lyrics/Story'] = formData.ownLyrics.trim();
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
                        cleanProperties[`Song ${song} Words`] = songWords.join(', ');
                    }
                }
            } else if (formData.package === 'one') {
                const words = [];
                if (formData.word1 && formData.word1.trim()) words.push(formData.word1.trim());
                if (formData.word2 && formData.word2.trim()) words.push(formData.word2.trim());
                if (formData.word3 && formData.word3.trim()) words.push(formData.word3.trim());
                if (words.length > 0) {
                    cleanProperties['Words/Names'] = words.join(', ');
                }
            }

            // Add song titles if provided
            if (formData.package === 'ep') {
                for (let i = 1; i <= 4; i++) {
                    const titleValue = formData[`songTitle${i}`];
                    if (titleValue && titleValue.trim()) {
                        cleanProperties[`Song ${i} Title`] = titleValue.trim();
                    }
                }
            } else if (formData.package === 'one') {
                const titleValue = formData.songTitle1;
                if (titleValue && titleValue.trim()) {
                    cleanProperties['Song Title'] = titleValue.trim();
                }
            }

            console.log('Clean properties being sent:', cleanProperties);

            // Prepare cart data with cleaned properties
            const cartData = {
                items: [{
                    id: variantId,
                    quantity: 1,
                    properties: cleanProperties
                }]
            };

            console.log('Cart data being sent:', cartData);

            // Store order data in localStorage for cart page
            localStorage.setItem('musicOrderData', JSON.stringify(formData));

            // Add to cart via Shopify API with better error handling
            fetch('/cart/add.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(cartData)
            })
            .then(response => {
                console.log('Cart API response status:', response.status);
                console.log('Cart API response headers:', response.headers);
                
                if (!response.ok) {
                    // Get response text for better error details
                    return response.text().then(text => {
                        console.error('Cart API error response:', text);
                        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                        try {
                            const errorJson = JSON.parse(text);
                            if (errorJson.message) {
                                errorMessage = errorJson.message;
                            } else if (errorJson.description) {
                                errorMessage = errorJson.description;
                            }
                        } catch (e) {
                            // Text response, use as is
                            if (text) {
                                errorMessage = text;
                            }
                        }
                        throw new Error(errorMessage);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Successfully added to cart:', data);
                
                // Update cart button if it exists
                if (typeof updateCartButton === 'function') {
                    updateCartButton();
                }
                
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
                console.error('Error details:', {
                    message: error.message,
                    stack: error.stack,
                    formData: formData,
                    cartData: cartData
                });
                
                // Show more specific error messages based on the error
                let errorMessage;
                
                if (error.message.includes('404')) {
                    errorMessage = currentLanguage === 'nl' ? 
                        'Product niet gevonden. Controleer de product configuratie.' : 
                        'Product not found. Please check product configuration.';
                } else if (error.message.includes('422')) {
                    errorMessage = currentLanguage === 'nl' ? 
                        'Product niet beschikbaar. Probeer het later opnieuw.' : 
                        'Product unavailable. Please try again later.';
                } else if (error.message.includes('variant')) {
                    errorMessage = currentLanguage === 'nl' ? 
                        'Product variant niet gevonden. Controleer uw selectie.' : 
                        'Product variant not found. Please check your selection.';
                } else if (error.message.includes('inventory')) {
                    errorMessage = currentLanguage === 'nl' ? 
                        'Product niet op voorraad.' : 
                        'Product out of stock.';
                } else {
                    // Include more details in generic error
                    errorMessage = currentLanguage === 'nl' ? 
                        `Er was een fout bij het toevoegen aan winkelwagen: ${error.message}` : 
                        `There was an error adding to cart: ${error.message}`;
                }
                
                alert(errorMessage);
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

        // FIXED DISCOUNT MODAL FUNCTIONS - PROPER STEP SWITCHING
        initializeDiscountModal: function() {
            console.log('🎯 Initializing discount modal...');
            
            // Wait for DOM to be fully ready
            setTimeout(() => {
                const modal = document.getElementById('discountModal');
                const modalContent = modal ? modal.querySelector('.modal-content') : null;
                
                console.log('📊 Modal elements check:', {
                    modal: !!modal,
                    modalContent: !!modalContent
                });
                
                if (!modal || !modalContent) {
                    console.warn('⚠️ Discount modal not found in DOM');
                    return;
                }
                
                // Ensure modal steps exist and are properly configured
                this.ensureModalStepsExist();
                
                // Setup modal event listeners
                this.setupDiscountModalListeners();
                
                console.log('✅ Discount modal initialized successfully');
                
            }, 500);
        },

        // FIXED: Ensure modal steps exist and are properly configured
        ensureModalStepsExist: function() {
            const modal = document.getElementById('discountModal');
            if (!modal) return;

            const emailStep = document.getElementById('emailStep');
            const codeStep = document.getElementById('codeStep');

            console.log('🔧 Checking modal steps:', { 
                emailStep: !!emailStep, 
                codeStep: !!codeStep 
            });

            // If email step doesn't exist, something is seriously wrong
            if (!emailStep) {
                console.error('❌ Email step missing from modal');
                return;
            }

            // Ensure both steps are properly configured
            emailStep.style.display = 'block';
            if (codeStep) {
                codeStep.style.display = 'none';
            }

            console.log('✅ Modal steps configured properly');
        },

        showDiscountModal: function() {
            console.log('🎯 Showing discount modal...');
            
            // Don't show modal if already shown
            if (AppState.ui.modalShown) {
                console.log('📝 Modal already shown, skipping');
                return;
            }
            
            const modal = document.getElementById('discountModal');
            if (!modal) {
                console.warn('⚠️ Discount modal not found');
                return;
            }
            
            // FIXED: Reset modal to email step before showing
            this.resetModalToEmailStep();
            
            // Show the modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            AppState.ui.modalShown = true;
            
            console.log('✅ Discount modal shown successfully');
        },

        // FIXED: Reset modal to email step (ensures clean state)
        resetModalToEmailStep: function() {
            console.log('🔄 Resetting modal to email step...');
            
            const emailStep = document.getElementById('emailStep');
            const codeStep = document.getElementById('codeStep');
            
            if (emailStep) {
                emailStep.style.display = 'block';
                emailStep.style.opacity = '1';
                emailStep.style.visibility = 'visible';
                emailStep.style.position = 'relative';
                emailStep.style.zIndex = '1';
                emailStep.style.textAlign = 'center';
                console.log('✅ Email step reset and visible');
            }
            
            if (codeStep) {
                codeStep.style.display = 'none';
                codeStep.style.opacity = '0';
                codeStep.style.visibility = 'hidden';
                codeStep.style.position = 'absolute';
                codeStep.style.zIndex = '0';
                codeStep.style.textAlign = 'center';
                console.log('✅ Code step hidden');
            }
        },

        // FIXED: Switch to code step with proper hiding/showing
        showDiscountCodeStep: function() {
            console.log('🔄 Switching to code step...');
            
            const emailStep = document.getElementById('emailStep');
            const codeStep = document.getElementById('codeStep');
            
            console.log('📊 Step elements found:', { 
                emailStep: !!emailStep, 
                codeStep: !!codeStep 
            });
            
            if (!emailStep || !codeStep) {
                console.error('❌ Modal steps not found');
                return;
            }

            // FIXED: Properly hide email step
            emailStep.style.display = 'none';
            emailStep.style.opacity = '0';
            emailStep.style.visibility = 'hidden';
            emailStep.style.position = 'absolute';
            emailStep.style.zIndex = '0';
            console.log('✅ Email step hidden completely');
            
            // FIXED: Properly show code step - now using simplified structure like email step
            codeStep.style.display = 'block';
            codeStep.style.opacity = '1';
            codeStep.style.visibility = 'visible';
            codeStep.style.position = 'relative';
            codeStep.style.zIndex = '1';
            codeStep.style.textAlign = 'center';
            
            console.log('✅ Code step shown with simplified structure');
        },

        // Submit discount email - UPDATED with CORS-FIXED Klaviyo integration
        submitDiscountEmail: function() {
            console.log('📧 Submitting discount email...');
            
            const emailInput = document.getElementById('discountEmail');
            const consentCheckbox = document.getElementById('emailConsent');
            
            const email = emailInput ? emailInput.value.trim() : '';
            const hasConsent = consentCheckbox ? consentCheckbox.checked : false;
            
            console.log('📊 Email submission data:', { 
                email: email ? '***@***.***' : 'empty', 
                hasConsent 
            });
            
            // Reset error states
            if (emailInput) emailInput.style.borderColor = '';
            const consentSection = document.getElementById('emailConsentCheckbox');
            if (consentSection) consentSection.classList.remove('error');
            
            // Validate email is required
            if (!email) {
                if (emailInput) {
                    emailInput.style.borderColor = '#ef4444';
                    emailInput.focus();
                }
                alert(currentLanguage === 'nl' ? 
                    'Voer uw e-mailadres in om uw kortingscode te ontvangen.' : 
                    'Please enter your email address to receive your discount code.');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                if (emailInput) {
                    emailInput.style.borderColor = '#ef4444';
                    emailInput.focus();
                }
                alert(currentLanguage === 'nl' ? 
                    'Voer een geldig e-mailadres in.' : 
                    'Please enter a valid email address.');
                return;
            }
            
            // Validate consent is required
            if (!hasConsent) {
                if (consentSection) consentSection.classList.add('error');
                alert(currentLanguage === 'nl' ? 
                    'U moet akkoord gaan met het ontvangen van e-mails om uw kortingscode te ontvangen.' : 
                    'You must agree to receive emails to get your discount code.');
                return;
            }
            
            // Set loading state on submit button
            const submitBtn = document.getElementById('submitDiscountEmail');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = translations[currentLanguage].sending;
            }
            
            // Send to Klaviyo first, then show discount code
            this.sendToKlaviyo(email, hasConsent)
                .then(() => {
                    // Store email and consent locally
                    localStorage.setItem('discountEmail', email);
                    localStorage.setItem('emailConsent', 'true');
                    console.log('📧 Email stored successfully');
                    
                    // Show the discount code step
                    this.showDiscountCodeStep();
                })
                .catch((error) => {
                    console.error('❌ Klaviyo submission failed:', error);
                    
                    // Still show discount code even if Klaviyo fails
                    localStorage.setItem('discountEmail', email);
                    localStorage.setItem('emailConsent', 'true');
                    this.showDiscountCodeStep();
                    
                    // Optionally show a warning (but don't block the user)
                    console.warn('⚠️ Email signup completed but automated email may be delayed');
                })
                .finally(() => {
                    // Reset button state
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = translations[currentLanguage].getDiscount;
                    }
                });
        },

        // KLAVIYO INTEGRATION - CORS FIXED for client-side with your credentials
        sendToKlaviyo: function(email, hasConsent) {
            return new Promise((resolve, reject) => {
                // Klaviyo credentials - YOUR ACTUAL CREDENTIALS
                const KLAVIYO_PUBLIC_KEY = 'TfapTr'; // Your actual public key
                const KLAVIYO_LIST_ID = 'X5gb9W'; // Your actual list ID
                
                console.log('📧 Sending email to Klaviyo (client-side):', email);
                
                // Prepare the profile data for client-side submission
                const profileData = {
                    $email: email,
                    $consent: ['email'],
                    consent_email: hasConsent,
                    signup_source: 'discount_modal',
                    signup_page: window.location.pathname,
                    signup_timestamp: new Date().toISOString(),
                    language: currentLanguage,
                    discount_code: 'MUSIC15',
                    user_agent: navigator.userAgent,
                    referrer: document.referrer || 'direct'
                };
                
                // Add language-specific properties
                if (currentLanguage === 'nl') {
                    profileData.preferred_language = 'Dutch';
                    profileData.country = 'Netherlands';
                } else {
                    profileData.preferred_language = 'English';
                }
                
                console.log('📊 Klaviyo client-side data:', profileData);
                
                // Method 1: Try Klaviyo's client-side subscribe endpoint
                this.klaviyoClientSubscribe(email, profileData, KLAVIYO_PUBLIC_KEY, KLAVIYO_LIST_ID)
                    .then(() => {
                        console.log('✅ Klaviyo client-side subscription successful');
                        resolve();
                    })
                    .catch((error) => {
                        console.warn('⚠️ Client-side subscription failed, trying identify method:', error);
                        // Fallback to identify method
                        this.klaviyoClientIdentify(email, profileData, KLAVIYO_PUBLIC_KEY)
                            .then(() => {
                                console.log('✅ Klaviyo identify successful');
                                resolve();
                            })
                            .catch((identifyError) => {
                                console.error('❌ All Klaviyo methods failed:', identifyError);
                                // Don't reject - let user continue with discount
                                resolve();
                            });
                    });
            });
        },

        // FIXED: Klaviyo client-side subscribe method with proper cleanup
        klaviyoClientSubscribe: function(email, profileData, publicKey, listId) {
            return new Promise((resolve, reject) => {
                // FIXED: Use fetch with no-cors mode to avoid CSP issues completely
                const subscribeUrl = 'https://manage.kmail-lists.com/subscriptions/subscribe';
                
                // Prepare form data
                const formData = new FormData();
                formData.append('g', listId);
                formData.append('email', email);
                formData.append('$fields', JSON.stringify(profileData));
                
                // FIXED: Use fetch with no-cors to avoid CSP violations and iframe cleanup issues
                fetch(subscribeUrl, {
                    method: 'POST',
                    mode: 'no-cors', // This prevents CSP issues and avoids iframe complications
                    body: formData
                }).then(() => {
                    console.log('✅ Klaviyo subscription completed (no-cors mode)');
                    resolve();
                }).catch((error) => {
                    console.warn('⚠️ Klaviyo fetch warning (expected in no-cors mode):', error.message);
                    // In no-cors mode, we can't read the response, but the request is sent
                    // So we resolve anyway as the subscription likely succeeded
                    resolve();
                });
                
                // Fallback timeout
                setTimeout(() => {
                    console.log('📤 Klaviyo subscription timeout - assuming success');
                    resolve();
                }, 3000);
            });
        },

        // Klaviyo client-side identify method (JSONP)
        klaviyoClientIdentify: function(email, profileData, publicKey) {
            return new Promise((resolve, reject) => {
                console.log('🔄 Trying Klaviyo identify method...');
                
                // Prepare identify data
                const identifyData = {
                    token: publicKey,
                    properties: {
                        $email: email,
                        ...profileData
                    }
                };
                
                // Create script tag for JSONP
                const script = document.createElement('script');
                const callbackName = 'klaviyo_callback_' + Date.now();
                
                // Set up callback
                window[callbackName] = function(response) {
                    console.log('✅ Klaviyo identify successful:', response);
                    delete window[callbackName];
                    if (script.parentNode) {
                        document.head.removeChild(script);
                    }
                    resolve();
                };
                
                // Prepare the URL
                const baseUrl = 'https://a.klaviyo.com/api/identify';
                const params = new URLSearchParams({
                    data: btoa(JSON.stringify(identifyData)),
                    c: callbackName
                });
                
                script.src = `${baseUrl}?${params.toString()}`;
                script.onerror = function() {
                    console.error('❌ Klaviyo identify failed');
                    delete window[callbackName];
                    if (script.parentNode) {
                        document.head.removeChild(script);
                    }
                    reject(new Error('Klaviyo identify failed'));
                };
                
                // Add timeout
                setTimeout(() => {
                    if (window[callbackName]) {
                        console.warn('⚠️ Klaviyo identify timeout');
                        delete window[callbackName];
                        if (script.parentNode) {
                            document.head.removeChild(script);
                        }
                        resolve(); // Don't reject on timeout
                    }
                }, 8000);
                
                document.head.appendChild(script);
            });
        },

        // Copy discount code to clipboard - REMOVED (no longer showing code)
        /*copyDiscountCode: function() {
            console.log('📋 Copying discount code...');
            
            const codeText = 'MUSIC15';
            const copyBtn = document.getElementById('copyDiscountCode');
            const copyTextSpan = copyBtn ? copyBtn.querySelector('.copy-text') : null;
            const copiedTextSpan = copyBtn ? copyBtn.querySelector('.copied-text') : null;
            
            copyToClipboard(codeText).then((success) => {
                if (success) {
                    console.log('✅ Code copied successfully');
                    
                    // Show success state
                    if (copyTextSpan) copyTextSpan.style.display = 'none';
                    if (copiedTextSpan) copiedTextSpan.style.display = 'inline';
                    if (copyBtn) {
                        copyBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                        copyBtn.style.color = 'white';
                    }
                    
                    // Show success notification
                    this.showCopySuccessNotification();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        if (copyTextSpan) copyTextSpan.style.display = 'inline';
                        if (copiedTextSpan) copiedTextSpan.style.display = 'none';
                        if (copyBtn) {
                            copyBtn.style.background = '';
                            copyBtn.style.color = '';
                        }
                    }, 3000);
                } else {
                    console.log('❌ Copy failed, showing fallback');
                    alert(currentLanguage === 'nl' ? 
                        'Kopieer deze code: ' + codeText : 
                        'Copy this code: ' + codeText);
                }
            });
        },*/

        // Show copy success notification - REMOVED (no longer needed)
        /*showCopySuccessNotification: function() {
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
                z-index: 10001;
                font-weight: 600;
                animation: slideInRight 0.3s ease-out;
                max-width: 300px;
                text-align: center;
                line-height: 1.4;
            `;
            notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.5rem; justify-content: center;">
                    <span>📋</span>
                    <span>${currentLanguage === 'nl' ? 'Code gekopieerd naar klembord!' : 'Code copied to clipboard!'}</span>
                </div>
            `;
            document.body.appendChild(notification);
            
            // Remove notification after delay
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 3000);
        },*/

        closeDiscountModal: function() {
            console.log('❌ Closing discount modal...');
            
            const modal = document.getElementById('discountModal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Reset modal state for next time
                this.resetModalToEmailStep();
                
                console.log('✅ Modal closed and reset');
            }
        },

        // FIXED: Setup discount modal event listeners
        setupDiscountModalListeners: function() {
            console.log('🔧 Setting up discount modal listeners...');
            
            // Wait a bit to ensure DOM is ready
            setTimeout(() => {
                // Close button
                const discountCloseBtn = document.querySelector('.discount-close');
                if (discountCloseBtn) {
                    discountCloseBtn.removeEventListener('click', this.closeDiscountModal);
                    discountCloseBtn.addEventListener('click', () => this.closeDiscountModal());
                    console.log('✅ Close button listener added');
                }

                // Click outside modal to close
                const discountModal = document.getElementById('discountModal');
                if (discountModal) {
                    discountModal.removeEventListener('click', this.handleModalOutsideClick);
                    discountModal.addEventListener('click', (e) => {
                        if (e.target === discountModal) {
                            this.closeDiscountModal();
                        }
                    });
                    console.log('✅ Outside click listener added');
                }

                // ESC key to close modal
                document.removeEventListener('keydown', this.handleModalEscKey);
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && discountModal && discountModal.style.display === 'block') {
                        this.closeDiscountModal();
                    }
                });

                // Submit email button
                const submitEmailBtn = document.getElementById('submitDiscountEmail');
                if (submitEmailBtn) {
                    submitEmailBtn.removeEventListener('click', this.submitDiscountEmail);
                    submitEmailBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.submitDiscountEmail();
                    });
                    console.log('✅ Submit email button listener added');
                }

                // Copy code button - REMOVED (no longer showing code)
                /*const copyCodeBtn = document.getElementById('copyDiscountCode');
                if (copyCodeBtn) {
                    copyCodeBtn.removeEventListener('click', this.copyDiscountCode);
                    copyCodeBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.copyDiscountCode();
                    });
                    console.log('✅ Copy code button listener added');
                }*/
                
                console.log('✅ All discount modal listeners set up');
                
            }, 100);
        },

        // Scroll trigger for discount popup
        setupScrollTrigger: function() {
            // PAGE DETECTION - Only show popup on homepage
            const isHomepage = window.location.pathname === '/' || 
                              window.location.pathname === '/index' ||
                              window.location.pathname.includes('/index') ||
                              document.body.classList.contains('template-index') ||
                              document.body.classList.contains('index') ||
                              document.querySelector('body[class*="index"]') !== null;
            
            if (!isHomepage) {
                console.log('Not on homepage - skipping discount popup');
                return; // Exit early, no popup on cart/other pages
            }
            
            console.log('On homepage - setting up discount popup trigger');
            
            // Wait a bit for DOM to be fully ready
            setTimeout(() => {
                const pricingSection = document.querySelector('.radio-group');
                
                if (pricingSection) {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting && !AppState.ui.modalShown) {
                                console.log('🎯 Pricing section visible, showing discount modal');
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
                        if (!AppState.ui.modalShown) {
                            console.log('🎯 Fallback: showing discount modal after timeout');
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

        // Newsletter Functions - UPDATED with Klaviyo integration
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

            // Get the button for loading state
            const button = document.querySelector('.newsletter-btn');
            const originalText = button ? button.textContent : '';
            
            if (button) {
                button.disabled = true;
                button.textContent = translations[currentLanguage].subscribing;
            }

            // Submit email to Klaviyo
            this.sendToKlaviyo(email, true)
                .then(() => {
                    console.log('✅ Newsletter signup successful');
                    
                    // Show success message
                    if (button) {
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
                })
                .catch((error) => {
                    console.error('❌ Newsletter signup failed:', error);
                    
                    // Show error state
                    if (button) {
                        button.textContent = translations[currentLanguage].errorTryAgain;
                        button.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                        
                        // Reset after 3 seconds
                        setTimeout(() => {
                            button.textContent = originalText;
                            button.style.background = 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)';
                            button.disabled = false;
                        }, 3000);
                    }
                });
        },

        submitEmailToNewsletter: function(email) {
            console.log('Submitting email to newsletter:', email);
            this.submitEmailToShopify(email, 'newsletter');
        },

        submitEmailToShopify: function(email, source = 'discount_banner') {
            console.log('Submitting email to Shopify as lead:', email, 'Source:', source);
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
    
    // FIXED: Export discount functions for global access with proper binding
    window.submitDiscountEmail = () => MusicadoApp.submitDiscountEmail();
    // window.copyDiscountCode = () => MusicadoApp.copyDiscountCode(); // REMOVED - no longer showing code
    window.closeDiscountModal = () => MusicadoApp.closeDiscountModal();
    
    // Legacy function for manual discount application (unchanged)
    window.applyDiscountCode = (code) => {
        if (!code) {
            alert(currentLanguage === 'nl' ? 'Voer een kortingscode in.' : 'Please enter a discount code.');
            return;
        }
        const result = StateManager.applyDiscount(code, 'manual');
        if (result.success) {
            alert(result.message);
        } else {
            alert(result.message);
        }
    };

    // Auto-initialize if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => MusicadoApp.init());
    } else {
        MusicadoApp.init();
    }

})();
