Exit
Edit code for musicado-v1-1-0

File picker
Filter files...
Filter files...
assets/musicado.js

Close musicado.js
has unsaved changes
No recent changes

File does not have any other versions

Selection deleted
2368
2369
2370
2371
2372
2373
2374
2375
2376
2377
2378
2379
2380
2381
2382
2383
2384
2385
2386
2387
2388
2389
2390
2391
2392
2393
2394
2395
2396
2397
2398
2399
2400
2401
2402
2403
2404
2405
2406
2407
2408
2409
2410
2411
2412
2413
2414
2415
2416
2417
2418
2419
2420
2421
2422
2423
2424
2425
2426
2427
2428
2429
2430
2431
2432
2433
2434
2435
2436
2437
2438
2439
2440
2441
2442
2443
2444
2445
2446
2447
2448
2449
2450
2451
2452
2453
2454
2455
2456
2457
⌄
⌄
⌄
⌄
⌄
⌄
⌄
⌄
⌄
⌄
⌄
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
    window.copyDiscountCode = () => MusicadoApp.copyDiscountCode();
    window.closeDiscountModal = () => MusicadoApp.closeDiscountModal();
    
    // Legacy function for manual discount application (unchanged)
    window.applyDiscountCode = (code) => {
        const result = StateManager.applyDiscount(code || 'MUSIC15', 'manual');
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
