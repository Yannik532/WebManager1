/**
 * Einfacher Website Konfigurator
 * Moderne ES6+ Implementierung - sauber und wartbar
 */

class WebsiteKonfigurator {
    constructor() {
        this.currentStep = 1;
        this.selectedType = null;
        this.selectedFeatures = new Set();
        this.selectedColorScheme = null;
        this.selectedDesignStyle = null;
        this.customColors = null;
        this.selectedImageTypes = new Set();
        this.uploadedFiles = [];
        this.basePrice = 0;
        this.totalPrice = 0;
        
        // Preise definieren
        this.prices = {
            types: {
            'landing': 999,
            'business': 1599,
            'ecommerce': 2999,
            'portfolio': 1299,
            'blog': 1199,
            'consulting': 1799
            },
            features: {
            'seo': 299,
            'analytics': 199,
            'booking': 399,
            'multilingual': 499,
                'chat': 299,
                'newsletter': 199
            }
        };
        
        // Type Namen für Display
        this.typeNames = {
            'landing': 'Landing Page',
            'business': 'Business Website',
            'ecommerce': 'E-Commerce Shop',
            'portfolio': 'Portfolio',
            'blog': 'Blog',
            'consulting': 'Consulting'
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateUI();
        console.log('✅ Website Konfigurator initialisiert');
    }
    
    bindEvents() {
        // Mobile Menu
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
        
        // Website Type Selection
        document.querySelectorAll('.website-card').forEach(card => {
            card.addEventListener('click', () => this.selectWebsiteType(card));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.selectWebsiteType(card);
                }
            });
        });
        
        // Feature Selection
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('click', () => this.toggleFeature(card));
            
            const checkbox = card.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.addEventListener('change', (e) => {
                    e.stopPropagation();
                        this.toggleFeature(card);
                });
            }
        });
        
        // Color Scheme Selection
        document.querySelectorAll('.color-scheme').forEach(scheme => {
            scheme.addEventListener('click', () => this.selectColorScheme(scheme));
            scheme.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.selectColorScheme(scheme);
                }
            });
        });
        
        // Design Style Selection
        document.querySelectorAll('.design-style').forEach(style => {
            style.addEventListener('click', () => this.selectDesignStyle(style));
            style.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.selectDesignStyle(style);
                }
            });
        });
        
        // Image Option Selection
        document.querySelectorAll('.image-option').forEach(option => {
            option.addEventListener('click', () => this.selectImageOption(option));
            option.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.selectImageOption(option);
                }
            });
        });
        
        // File Upload Handler
        const imageUpload = document.getElementById('image-upload');
        if (imageUpload) {
            imageUpload.addEventListener('change', (e) => this.handleFileUpload(e));
        }
        
        // Navigation Buttons
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        const submitBtn = document.getElementById('submit-btn');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextStep());
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevStep());
        }
        
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitForm());
        }
        
        // Form Validation
        const form = document.getElementById('project-form');
        if (form) {
            form.addEventListener('input', () => this.validateForm());
        }
        
        // Custom Industry Field Toggle
        const industrySelect = document.getElementById('industry');
        if (industrySelect) {
            industrySelect.addEventListener('change', () => this.toggleCustomIndustryField());
        }
        
        // Character Counter for Textareas
        this.initCharacterCounters();
        
        // Color Modal
        const moreColorsBtn = document.getElementById('more-colors-btn');
        const colorModal = document.getElementById('color-modal');
        const closeModalBtn = document.getElementById('close-color-modal');
        const modalBackdrop = document.getElementById('color-modal-backdrop');
        
        if (moreColorsBtn && colorModal) {
            moreColorsBtn.addEventListener('click', () => this.openColorModal());
            moreColorsBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openColorModal();
                }
            });
        }
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => this.closeColorModal());
        }
        
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', () => this.closeColorModal());
        }
        
        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (colorModal && !colorModal.classList.contains('hidden')) {
                    this.closeColorModal();
                }
                if (customColorModal && !customColorModal.classList.contains('hidden')) {
                    this.closeCustomColorModal();
                }
            }
        });
        
        // Custom Color Modal
        const customColorsBtn = document.getElementById('custom-colors-btn');
        const customColorModal = document.getElementById('custom-color-modal');
        const closeCustomModalBtn = document.getElementById('close-custom-color-modal');
        const customModalBackdrop = document.getElementById('custom-color-modal-backdrop');
        
        if (customColorsBtn && customColorModal) {
            customColorsBtn.addEventListener('click', () => this.openCustomColorModal());
            customColorsBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openCustomColorModal();
                }
            });
        }
        
        if (closeCustomModalBtn) {
            closeCustomModalBtn.addEventListener('click', () => this.closeCustomColorModal());
        }
        
        if (customModalBackdrop) {
            customModalBackdrop.addEventListener('click', () => this.closeCustomColorModal());
        }
        
        // Initialize Custom Color Modal
        this.initCustomColorModal();
        
        // Color Scheme Modal Selection
        document.querySelectorAll('.color-scheme-modal').forEach(scheme => {
            scheme.addEventListener('click', () => {
                this.selectColorSchemeFromModal(scheme);
                this.closeColorModal();
            });
        });
    }
    
    // Neue Methode: Automatische Feature-Empfehlungen basierend auf Website-Typ
    getRecommendedFeatures(websiteType) {
        const recommendations = {
            'business': {
                required: ['seo', 'analytics'], // Diese werden automatisch aktiviert
                recommended: ['chat', 'newsletter'], // Diese werden als empfohlen markiert
                description: 'Business-Websites sind bereits SEO-optimiert und beinhalten Analytics'
            },
            'ecommerce': {
                required: ['seo', 'analytics'],
                recommended: ['chat', 'multilingual'],
                description: 'E-Commerce-Shops benötigen SEO und Analytics für erfolgreichen Verkauf'
            },
            'consulting': {
                required: ['seo', 'booking'],
                recommended: ['chat', 'analytics'],
                description: 'Consulting-Websites sind SEO-optimiert und beinhalten Terminbuchung'
            },
            'blog': {
                required: ['seo'],
                recommended: ['newsletter', 'analytics'],
                description: 'Blog-Websites sind SEO-optimiert für bessere Reichweite'
            },
            'portfolio': {
                required: [],
                recommended: ['seo', 'analytics'],
                description: 'Portfolio-Websites profitieren von SEO für bessere Sichtbarkeit'
            },
            'landing': {
                required: ['analytics'],
                recommended: ['seo'],
                description: 'Landing Pages beinhalten Analytics für Conversion-Tracking'
            }
        };
        
        return recommendations[websiteType] || { required: [], recommended: [], description: '' };
    }
    
    // Erweiterte selectWebsiteType Methode
    selectWebsiteType(card) {
        // Vorherige Auswahl entfernen
        document.querySelectorAll('.website-card').forEach(c => {
            c.classList.remove('border-primary-500', 'bg-primary-500/10');
        });
        
        // Neue Auswahl markieren
        card.classList.add('border-primary-500', 'bg-primary-500/10');
        
        this.selectedType = card.dataset.type;
        this.basePrice = parseInt(card.dataset.price);
        
        // Automatische Feature-Empfehlungen anwenden
        this.applyFeatureRecommendations(this.selectedType);
        
        this.updatePrice();
        this.updateSummary();
        this.updateUI();
        
        console.log(`✅ Website-Typ gewählt: ${this.selectedType}`);
    }
    
    // Neue Methode: Feature-Empfehlungen anwenden
    applyFeatureRecommendations(websiteType) {
        const recommendations = this.getRecommendedFeatures(websiteType);
        
        // Alle Features zurücksetzen
        this.selectedFeatures.clear();
        document.querySelectorAll('.feature-card').forEach(card => {
            const checkbox = card.querySelector('input[type="checkbox"]');
            const feature = card.dataset.feature;
            
            // Checkbox state zurücksetzen
            checkbox.checked = false;
            card.classList.remove('border-primary-500', 'bg-primary-500/10', 'border-green-500', 'bg-green-500/10');
            
            // Empfohlen-Badge entfernen
            const existingBadge = card.querySelector('.recommendation-badge');
            if (existingBadge) {
                existingBadge.remove();
            }
        });
        
        // Required Features automatisch aktivieren
        recommendations.required.forEach(feature => {
            const card = document.querySelector(`[data-feature="${feature}"]`);
            if (card) {
                const checkbox = card.querySelector('input[type="checkbox"]');
                checkbox.checked = true;
                card.classList.add('border-green-500', 'bg-green-500/10');
                this.selectedFeatures.add(feature);
                
                // "Inkludiert" Badge hinzufügen
                const badge = document.createElement('div');
                badge.className = 'recommendation-badge absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold';
                badge.textContent = 'Inkludiert';
                card.style.position = 'relative';
                card.appendChild(badge);
            }
        });
        
        // Recommended Features als empfohlen markieren
        recommendations.recommended.forEach(feature => {
            const card = document.querySelector(`[data-feature="${feature}"]`);
            if (card) {
                card.classList.add('border-blue-400', 'bg-blue-400/5');
                
                // "Empfohlen" Badge hinzufügen
                const badge = document.createElement('div');
                badge.className = 'recommendation-badge absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold';
                badge.textContent = 'Empfohlen';
                card.style.position = 'relative';
                card.appendChild(badge);
            }
        });
        
        // Info-Box für User anzeigen
        this.showFeatureRecommendationInfo(recommendations.description);
    }
    
    // Neue Methode: Info-Box für Feature-Empfehlungen
    showFeatureRecommendationInfo(description) {
        // Bestehende Info-Box entfernen
        const existingInfo = document.getElementById('feature-recommendation-info');
        if (existingInfo) {
            existingInfo.remove();
        }
        
        if (description) {
            const step2 = document.getElementById('step-2');
            const header = step2.querySelector('header');
            
            const infoBox = document.createElement('div');
            infoBox.id = 'feature-recommendation-info';
            infoBox.className = 'bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6';
            infoBox.innerHTML = `
                <div class="flex items-start space-x-3">
                    <i class="fas fa-info-circle text-blue-400 text-lg mt-0.5"></i>
                    <div>
                        <h4 class="text-blue-400 font-semibold mb-1">Automatische Empfehlungen</h4>
                        <p class="text-blue-200 text-sm">${description}</p>
                    </div>
                </div>
            `;
            
            header.insertAdjacentElement('afterend', infoBox);
        }
    }
    
    toggleFeature(card) {
        const feature = card.dataset.feature;
        const checkbox = card.querySelector('input[type="checkbox"]');
        const isRequired = this.isFeatureRequired(feature);
        
        if (this.selectedFeatures.has(feature)) {
            // Prüfen ob Feature required ist
            if (isRequired) {
                // Required Feature kann nicht abgewählt werden
                checkbox.checked = true; // Checkbox wieder aktivieren
                this.showNotification('Dieses Feature ist in Ihrem gewählten Website-Typ bereits enthalten und kann nicht abgewählt werden.', 'info');
                return;
            }
            
            // Deselect feature
            this.selectedFeatures.delete(feature);
            card.classList.remove('border-primary-500', 'bg-primary-500/10');
            if (checkbox) checkbox.checked = false;
        } else {
            // Select feature
            this.selectedFeatures.add(feature);
            card.classList.add('border-primary-500', 'bg-primary-500/10');
            if (checkbox) checkbox.checked = true;
            
            // Empfohlen-Badge entfernen wenn Feature ausgewählt wird
            const recommendedBadge = card.querySelector('.recommendation-badge');
            if (recommendedBadge && recommendedBadge.textContent === 'Empfohlen') {
                recommendedBadge.remove();
                card.classList.remove('border-blue-400', 'bg-blue-400/5');
            }
        }
        
        this.updatePrice();
        this.updateSummary();
        
        console.log('✅ Features aktualisiert:', Array.from(this.selectedFeatures));
    }
    
    // Neue Methode: Prüft ob Feature required ist
    isFeatureRequired(feature) {
        if (!this.selectedType) return false;
        const recommendations = this.getRecommendedFeatures(this.selectedType);
        return recommendations.required.includes(feature);
    }
    
    // Neue Methode: Bildoption auswählen (Multi-Select)
    selectImageOption(option) {
        const imageType = option.dataset.imageType;
        
        // IMMER zuerst alle Details verstecken und nur die aktuelle anzeigen
        document.querySelectorAll('.image-details').forEach(detail => {
            detail.classList.add('hidden');
        });
        
        // Upload-Area standardmäßig verstecken
        const uploadArea = document.querySelector('.upload-area');
        uploadArea?.classList.add('hidden');
        
        // Toggle-Logik für Multi-Select der Auswahl
        if (this.selectedImageTypes.has(imageType)) {
            // Abwählen
            this.selectedImageTypes.delete(imageType);
            option.classList.remove('border-primary-500', 'bg-primary-500/10');
            
            // Checkbox unchecken
            const checkbox = option.querySelector('input[type="checkbox"]');
            if (checkbox) checkbox.checked = false;
        } else {
            // Auswählen
            this.selectedImageTypes.add(imageType);
            option.classList.add('border-primary-500', 'bg-primary-500/10');
            
            // Checkbox checken
            const checkbox = option.querySelector('input[type="checkbox"]');
            if (checkbox) checkbox.checked = true;
        }
        
        // Immer die Info der AKTUELL geklickten Option anzeigen (unabhängig von Multi-Select)
        if (imageType === 'upload') {
            uploadArea?.classList.remove('hidden');
            document.getElementById('upload-details')?.classList.remove('hidden');
        } else if (imageType === 'stock') {
            document.getElementById('stock-details')?.classList.remove('hidden');
        } else if (imageType === 'ai') {
            document.getElementById('ai-details')?.classList.remove('hidden');
        }
        
        // Details Container anzeigen wenn mindestens eine Option gewählt ist
        const detailsContainer = document.getElementById('image-options-details');
        if (this.selectedImageTypes.size > 0) {
            detailsContainer.classList.remove('hidden');
        } else {
            detailsContainer.classList.add('hidden');
        }
        
        this.updateSummary();
        
        console.log('✅ Bildoptionen gewählt:', Array.from(this.selectedImageTypes));
        console.log('✅ Aktuell angezeigte Info:', imageType);
    }
    
    // Neue Methode: File Upload verarbeiten
    handleFileUpload(event) {
        const files = Array.from(event.target.files);
        const uploadedFilesContainer = document.getElementById('uploaded-files');
        
        files.forEach(file => {
            // Validierung
            if (!file.type.startsWith('image/')) {
                this.showNotification('Nur Bilddateien sind erlaubt.', 'error');
                return;
            }
            
            if (file.size > 10 * 1024 * 1024) { // 10MB
                this.showNotification(`${file.name} ist zu groß. Maximum: 10MB`, 'error');
                return;
            }
            
            // File zur Liste hinzufügen
            this.uploadedFiles.push(file);
            
            // File Element erstellen
            const fileElement = document.createElement('div');
            fileElement.className = 'flex items-center justify-between p-3 bg-slate-700/50 rounded-lg';
            fileElement.innerHTML = `
                <div class="flex items-center space-x-3">
                    <i class="fas fa-image text-blue-400"></i>
                    <div>
                        <p class="text-sm font-medium text-white">${file.name}</p>
                        <p class="text-xs text-slate-400">${(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                </div>
                <button class="text-red-400 hover:text-red-300 p-1" onclick="konfigurator.removeUploadedFile('${file.name}', this.parentElement)">
                    <i class="fas fa-trash text-sm"></i>
                </button>
            `;
            
            uploadedFilesContainer.appendChild(fileElement);
        });
        
        // Summary aktualisieren
        this.updateSummary();
        
        console.log('✅ Dateien hochgeladen:', this.uploadedFiles.map(f => f.name));
    }
    
    // Neue Methode: Hochgeladene Datei entfernen
    removeUploadedFile(fileName, element) {
        this.uploadedFiles = this.uploadedFiles.filter(file => file.name !== fileName);
        element.remove();
        
        // Summary aktualisieren
        this.updateSummary();
        
        console.log('✅ Datei entfernt:', fileName);
    }
    
    selectColorScheme(scheme) {
        // Remove previous selection
        document.querySelectorAll('.color-scheme').forEach(s => {
            s.classList.remove('border-primary-500', 'bg-primary-500/10');
            s.classList.add('border-slate-600/50');
        });
        
        // Select new scheme
        scheme.classList.remove('border-slate-600/50');
        scheme.classList.add('border-primary-500', 'bg-primary-500/10');
        
        this.selectedColorScheme = scheme.dataset.scheme;
        this.updateSummary();
        this.updateUI();
        
        console.log('✅ Farbschema ausgewählt:', this.selectedColorScheme);
    }
    
    selectDesignStyle(style) {
        // Remove previous selection
        document.querySelectorAll('.design-style').forEach(s => {
            s.classList.remove('border-primary-500', 'bg-primary-500/10');
            s.classList.add('border-slate-600/50');
        });
        
        // Select new style
        style.classList.remove('border-slate-600/50');
        style.classList.add('border-primary-500', 'bg-primary-500/10');
        
        this.selectedDesignStyle = style.dataset.style;
        this.updateSummary();
        this.updateUI();
        
        console.log('✅ Design-Stil ausgewählt:', this.selectedDesignStyle);
    }
    
    openColorModal() {
        const modal = document.getElementById('color-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Focus trap für Barrierefreiheit
            setTimeout(() => {
                const closeBtn = document.getElementById('close-color-modal');
                if (closeBtn) closeBtn.focus();
            }, 100);
        }
    }
    
    closeColorModal() {
        const modal = document.getElementById('color-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }
    
    openCustomColorModal() {
        const modal = document.getElementById('custom-color-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Focus trap für Barrierefreiheit
            setTimeout(() => {
                const closeBtn = document.getElementById('close-custom-color-modal');
                if (closeBtn) closeBtn.focus();
            }, 100);
        }
    }
    
    closeCustomColorModal() {
        const modal = document.getElementById('custom-color-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }
    
    initCustomColorModal() {
        // Event Listeners für Color Picker
        const primaryColor = document.getElementById('custom-primary-color');
        const secondaryColor = document.getElementById('custom-secondary-color');
        const tertiaryColor = document.getElementById('custom-tertiary-color');
        
        const primaryHex = document.getElementById('custom-primary-hex');
        const secondaryHex = document.getElementById('custom-secondary-hex');
        const tertiaryHex = document.getElementById('custom-tertiary-hex');
        
        // Color Picker zu Hex Input synchronisieren
        if (primaryColor && primaryHex) {
            primaryColor.addEventListener('input', (e) => {
                primaryHex.value = e.target.value.toUpperCase();
                this.updateCustomColorPreview();
            });
            
            primaryHex.addEventListener('input', (e) => {
                const value = e.target.value;
                if (this.isValidHex(value)) {
                    primaryColor.value = value;
                    this.updateCustomColorPreview();
                }
            });
        }
        
        if (secondaryColor && secondaryHex) {
            secondaryColor.addEventListener('input', (e) => {
                secondaryHex.value = e.target.value.toUpperCase();
                this.updateCustomColorPreview();
            });
            
            secondaryHex.addEventListener('input', (e) => {
                const value = e.target.value;
                if (this.isValidHex(value)) {
                    secondaryColor.value = value;
                    this.updateCustomColorPreview();
                }
            });
        }
        
        if (tertiaryColor && tertiaryHex) {
            tertiaryColor.addEventListener('input', (e) => {
                tertiaryHex.value = e.target.value.toUpperCase();
                this.updateCustomColorPreview();
            });
            
            tertiaryHex.addEventListener('input', (e) => {
                const value = e.target.value;
                if (this.isValidHex(value)) {
                    tertiaryColor.value = value;
                    this.updateCustomColorPreview();
                }
            });
        }
        
        // Schnellauswahl Presets
        document.querySelectorAll('.custom-preset').forEach(preset => {
            preset.addEventListener('click', (e) => {
                e.preventDefault();
                const colors = preset.dataset.colors.split(',');
                if (colors.length === 3) {
                    if (primaryColor) primaryColor.value = colors[0];
                    if (primaryHex) primaryHex.value = colors[0].toUpperCase();
                    if (secondaryColor) secondaryColor.value = colors[1];
                    if (secondaryHex) secondaryHex.value = colors[1].toUpperCase();
                    if (tertiaryColor) tertiaryColor.value = colors[2];
                    if (tertiaryHex) tertiaryHex.value = colors[2].toUpperCase();
                    this.updateCustomColorPreview();
                }
            });
        });
        
        // Reset Button
        const resetBtn = document.getElementById('reset-custom-colors');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (primaryColor) primaryColor.value = '#3B82F6';
                if (primaryHex) primaryHex.value = '#3B82F6';
                if (secondaryColor) secondaryColor.value = '#10B981';
                if (secondaryHex) secondaryHex.value = '#10B981';
                if (tertiaryColor) tertiaryColor.value = '#8B5CF6';
                if (tertiaryHex) tertiaryHex.value = '#8B5CF6';
                this.updateCustomColorPreview();
            });
        }
        
        // Apply Button
        const applyBtn = document.getElementById('apply-custom-colors');
        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                this.applyCustomColors();
            });
        }
    }
    
    updateCustomColorPreview() {
        const primaryColor = document.getElementById('custom-primary-color')?.value;
        const secondaryColor = document.getElementById('custom-secondary-color')?.value;
        const tertiaryColor = document.getElementById('custom-tertiary-color')?.value;
        
        const previewPrimary = document.getElementById('preview-primary');
        const previewSecondary = document.getElementById('preview-secondary');
        const previewTertiary = document.getElementById('preview-tertiary');
        
        if (previewPrimary && primaryColor) {
            previewPrimary.style.backgroundColor = primaryColor;
        }
        if (previewSecondary && secondaryColor) {
            previewSecondary.style.backgroundColor = secondaryColor;
        }
        if (previewTertiary && tertiaryColor) {
            previewTertiary.style.backgroundColor = tertiaryColor;
        }
    }
    
    applyCustomColors() {
        const primaryColor = document.getElementById('custom-primary-color')?.value;
        const secondaryColor = document.getElementById('custom-secondary-color')?.value;
        const tertiaryColor = document.getElementById('custom-tertiary-color')?.value;
        
        if (primaryColor && secondaryColor && tertiaryColor) {
            // Remove previous color scheme selections
            document.querySelectorAll('.color-scheme').forEach(s => {
                s.classList.remove('border-primary-500', 'bg-primary-500/10');
                s.classList.add('border-slate-600/50');
            });
            
            // Set custom colors
            this.selectedColorScheme = 'custom';
            this.customColors = {
                primary: primaryColor,
                secondary: secondaryColor,
                tertiary: tertiaryColor
            };
            
            this.updateSummary();
            this.updateUI();
            this.closeCustomColorModal();
            
            this.showNotification('Eigenes Farbschema erfolgreich angewendet!', 'success');
            console.log('✅ Eigenes Farbschema angewendet:', this.customColors);
        }
    }
    
    isValidHex(hex) {
        return /^#[0-9A-F]{6}$/i.test(hex);
    }
    
    selectColorSchemeFromModal(scheme) {
        // Remove previous selection from main color schemes
        document.querySelectorAll('.color-scheme').forEach(s => {
            s.classList.remove('border-primary-500', 'bg-primary-500/10');
            s.classList.add('border-slate-600/50');
        });
        
        // Set the selected scheme
        this.selectedColorScheme = scheme.dataset.scheme;
        this.updateSummary();
        this.updateUI();
        
        console.log('✅ Farbschema aus Modal ausgewählt:', this.selectedColorScheme);
    }
    
    updatePrice() {
        this.totalPrice = this.basePrice;
        
        this.selectedFeatures.forEach(feature => {
            // Nur zusätzliche Features berechnen, nicht die inkludierten
            if (!this.isFeatureRequired(feature)) {
                this.totalPrice += this.prices.features[feature] || 0;
            }
        });
    }
    
    updateSummary() {
        const summaryType = document.getElementById('summary-type');
        const summaryFeatures = document.getElementById('summary-features');
        const summaryDesign = document.getElementById('summary-design');
        const summaryTotal = document.getElementById('summary-total');
        
        // Update type
        if (summaryType) {
            summaryType.textContent = this.selectedType ? 
                this.typeNames[this.selectedType] : 
                'Noch nicht ausgewählt';
        }
        
        // Update features
        if (summaryFeatures) {
            if (this.selectedFeatures.size === 0) {
                summaryFeatures.innerHTML = '<span class="text-sm text-slate-300">Noch keine Features ausgewählt</span>';
            } else {
                const featureElements = Array.from(this.selectedFeatures).map(feature => {
                    const isRequired = this.isFeatureRequired(feature);
                    const price = this.prices.features[feature];
                    const priceText = isRequired ? 'Inkludiert' : `+${price}€`;
                    const badgeClass = isRequired ? 'bg-green-500/20 text-green-400' : 'bg-slate-700/50 text-slate-300';
                    return `<span class="inline-block px-2 py-1 ${badgeClass} text-xs rounded-full mr-1 mb-1">${this.getFeatureName(feature)} (${priceText})</span>`;
                }).join('');
                summaryFeatures.innerHTML = featureElements;
            }
        }
        
        // Update design
        if (summaryDesign) {
            let designText = 'Noch nicht ausgewählt';
            
            if (this.selectedColorScheme || this.selectedDesignStyle) {
                const parts = [];
                if (this.selectedColorScheme) {
                    parts.push(this.getColorSchemeName(this.selectedColorScheme));
                }
                if (this.selectedDesignStyle) {
                    parts.push(this.getDesignStyleName(this.selectedDesignStyle));
                }
                designText = parts.join(' + ');
            }
            
            summaryDesign.textContent = designText;
        }
        
        // Update images
        const summaryImages = document.getElementById('summary-images');
        console.log('🔍 Debug - summaryImages Element:', summaryImages);
        console.log('🔍 Debug - selectedImageTypes:', Array.from(this.selectedImageTypes));
        
        if (summaryImages) {
            if (this.selectedImageTypes.size === 0) {
                summaryImages.innerHTML = '<span class="text-sm text-slate-300">Noch keine Bildquelle ausgewählt</span>';
                console.log('🔍 Debug - Keine Bildquellen ausgewählt');
            } else {
                const imageElements = Array.from(this.selectedImageTypes).map(imageType => {
                    const badgeClass = this.getImageTypeBadgeClass(imageType);
                    const icon = this.getImageTypeIcon(imageType);
                    return `<span class="inline-block px-2 py-1 ${badgeClass} text-xs rounded-full mr-1 mb-1">
                        <i class="${icon} mr-1"></i>${this.getImageTypeName(imageType)}
                    </span>`;
                }).join('');
                
                // Zusatz-Info für Upload-Dateien
                let uploadInfo = '';
                if (this.selectedImageTypes.has('upload') && this.uploadedFiles.length > 0) {
                    uploadInfo = `<div class="text-xs text-slate-400 mt-1">${this.uploadedFiles.length} Datei(en) hochgeladen</div>`;
                }
                
                const finalHTML = imageElements + uploadInfo;
                summaryImages.innerHTML = finalHTML;
                console.log('🔍 Debug - Bildquellen HTML:', finalHTML);
            }
        } else {
            console.log('❌ Debug - summary-images Element nicht gefunden!');
        }
        
        // Update total
        if (summaryTotal) {
            summaryTotal.textContent = `${this.totalPrice.toLocaleString('de-DE')}€`;
        }
    }
    
    getFeatureName(feature) {
        const names = {
            'seo': 'SEO',
            'analytics': 'Analytics',
            'booking': 'Buchung',
            'multilingual': 'Mehrsprachig',
            'chat': 'Live Chat',
            'newsletter': 'Newsletter'
        };
        return names[feature] || feature;
    }
    
    getColorSchemeName(scheme) {
        if (scheme === 'custom') {
            return 'Eigenes Farbschema';
        }
        
        const names = {
            // Standard Schemes
            'modern-blue': 'Modern Blue',
            'elegant-dark': 'Elegant Dark',
            'nature-green': 'Nature Green',
            'warm-orange': 'Warm Orange',
            'sunset-pink': 'Sunset Pink',
            'ocean-teal': 'Ocean Teal',
            
            // Helle Farben
            'sky-blue': 'Sky Blue',
            'cotton-candy': 'Cotton Candy',
            'sunrise-fresh': 'Sunrise Fresh',
            'cream-dream': 'Cream Dream',
            'mint-fresh': 'Mint Fresh',
            'peach-sunset': 'Peach Sunset',
            'lavender-dream': 'Lavender Dream',
            'soft-coral': 'Soft Coral',
            
            // Pastell Farben
            'baby-blue': 'Baby Blue',
            'soft-rose': 'Soft Rose',
            'mint-cream': 'Mint Cream',
            'lemon-chiffon': 'Lemon Chiffon',
            'lilac-mist': 'Lilac Mist',
            'peachy-keen': 'Peachy Keen',
            'powder-blue': 'Powder Blue',
            'sage-green': 'Sage Green',
            'blush-pink': 'Blush Pink',
            'vanilla-cream': 'Vanilla Cream',
            
            // Business & Corporate
            'executive-blue': 'Executive Blue',
            'corporate-gray': 'Corporate Gray',
            'banking-green': 'Banking Green',
            'tech-navy': 'Tech Navy',
            'legal-burgundy': 'Legal Burgundy',
            'finance-gold': 'Finance Gold',
            'consulting-teal': 'Consulting Teal',
            'medical-white': 'Medical White',
            
            // Dunkle Farben
            'midnight-black': 'Midnight Black',
            'forest-deep': 'Forest Deep',
            'royal-purple': 'Royal Purple',
            'charcoal-professional': 'Charcoal Professional',
            
            // Bunte Farben
            'tropical-paradise': 'Tropical Paradise',
            'electric-energy': 'Electric Energy',
            'rainbow-gradient': 'Rainbow Gradient',
            'neon-glow': 'Neon Glow',
            
            // Außergewöhnliche Farben
            'galaxy-space': 'Galaxy Space',
            'autumn-gold': 'Autumn Gold',
            'ice-crystal': 'Ice Crystal',
            'fire-phoenix': 'Fire Phoenix'
        };
        return names[scheme] || scheme;
    }
    
    getDesignStyleName(style) {
        const names = {
            'modern': 'Modern & Minimalistisch',
            'creative': 'Kreativ & Verspielt',
            'professional': 'Professionell & Corporate',
            'elegant': 'Elegant & Luxuriös',
            'tech': 'Tech & Futuristisch',
            'warm': 'Warm & Einladend'
        };
        return names[style] || style;
    }
    
    getImageTypeName(imageType) {
        const names = {
            'upload': 'Eigene Bilder',
            'stock': 'Lizenzfreie Bilder',
            'ai': 'KI-generierte Bilder'
        };
        return names[imageType] || imageType;
    }
    
    getImageTypeBadgeClass(imageType) {
        const classes = {
            'upload': 'bg-blue-500/20 text-blue-400',
            'stock': 'bg-green-500/20 text-green-400', 
            'ai': 'bg-purple-500/20 text-purple-400'
        };
        return classes[imageType] || 'bg-slate-500/20 text-slate-400';
    }
    
    getImageTypeIcon(imageType) {
        const icons = {
            'upload': 'fas fa-cloud-upload-alt',
            'stock': 'fas fa-images',
            'ai': 'fas fa-magic'
        };
        return icons[imageType] || 'fas fa-image';
    }
    
    updateUI() {
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        const submitBtn = document.getElementById('submit-btn');
        
        // Update progress
        this.updateProgress();
        
        // Update navigation buttons
        if (nextBtn) {
            if (this.currentStep === 1) {
                nextBtn.disabled = !this.selectedType;
            } else if (this.currentStep === 2) {
                nextBtn.disabled = false; // Features sind optional
            } else if (this.currentStep === 3) {
                nextBtn.disabled = false; // Design ist optional
            } else {
                nextBtn.disabled = true;
            }
        }
        
        if (prevBtn) {
            prevBtn.classList.toggle('hidden', this.currentStep === 1);
        }
        
        if (submitBtn) {
            if (this.currentStep === 4) {
                submitBtn.classList.remove('hidden');
                nextBtn?.classList.add('hidden');
                this.validateForm();
            } else {
                submitBtn.classList.add('hidden');
                nextBtn?.classList.remove('hidden');
            }
        }
    }
    
    updateProgress() {
        // Update step circles
        document.querySelectorAll('.step-circle').forEach((circle, index) => {
            const stepNumber = index + 1;
            if (stepNumber === this.currentStep) {
                circle.className = 'w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-semibold step-circle';
                circle.nextElementSibling.className = 'ml-2 text-sm font-medium text-white';
            } else if (stepNumber < this.currentStep) {
                circle.className = 'w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold step-circle';
                circle.innerHTML = '<i class="fas fa-check"></i>';
                circle.nextElementSibling.className = 'ml-2 text-sm font-medium text-green-400';
            } else {
                circle.className = 'w-10 h-10 bg-slate-600 text-slate-400 rounded-full flex items-center justify-center font-semibold step-circle';
                circle.textContent = stepNumber;
                circle.nextElementSibling.className = 'ml-2 text-sm font-medium text-slate-400';
            }
        });
    }
    
    showStep(step) {
        // Hide all steps
        document.querySelectorAll('.config-step').forEach(section => {
            section.classList.add('hidden');
        });
        
        // Show current step
        const currentSection = document.getElementById(`step-${step}`);
        if (currentSection) {
            currentSection.classList.remove('hidden');
        }
        
        this.currentStep = step;
        this.updateUI();
    }
    
    nextStep() {
        if (this.currentStep < 4) {
            this.showStep(this.currentStep + 1);
        }
    }
    
    prevStep() {
        if (this.currentStep > 1) {
            this.showStep(this.currentStep - 1);
        }
    }
    
    validateForm() {
        const form = document.getElementById('project-form');
        const submitBtn = document.getElementById('submit-btn');
        
        if (!form || !submitBtn) return;
        
        const requiredFields = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
            }
        });
        
        submitBtn.disabled = !isValid;
    }
    
    async submitForm() {
        const form = document.getElementById('project-form');
        if (!form) return;
        
        const formData = new FormData(form);
        const detailedPrompt = this.generateDetailedPrompt();
        
        const data = {
            // Basis Konfigurations-Daten
            websiteType: this.selectedType,
            websiteTypeName: this.typeNames[this.selectedType],
            basePrice: this.basePrice,
            features: Array.from(this.selectedFeatures),
            featuresWithStatus: this.getFeaturesWithStatus(),
            colorScheme: this.selectedColorScheme,
            colorSchemeName: this.getColorSchemeName(this.selectedColorScheme),
            customColors: this.customColors,
            designStyle: this.selectedDesignStyle,
            designStyleName: this.getDesignStyleName(this.selectedDesignStyle),
            imageTypes: Array.from(this.selectedImageTypes),
            uploadedFilesCount: this.uploadedFiles.length,
            totalPrice: this.totalPrice,
            
            // Formular-Daten
            companyName: formData.get('companyName'),
            industry: formData.get('industry'),
            customIndustry: formData.get('customIndustry'),
            projectDescription: formData.get('projectDescription'),
            inspirations: formData.get('inspirations'),
            contactName: formData.get('contactName'),
            contactEmail: formData.get('contactEmail'),
            contactPhone: formData.get('contactPhone'),
            timeline: formData.get('timeline'),
            additionalNotes: formData.get('additionalNotes'),
            
            // Generierter Prompt
            generatedPrompt: detailedPrompt,
            
            // Metadaten
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'Direct',
            configurationId: this.generateConfigurationId()
        };
        
        try {
            this.showNotification('Anfrage wird gesendet...', 'info');
            
            // Mehrere Versandoptionen parallel ausführen
            const promises = [];
            
            // 1. Webhook an dein CRM/Backend
            promises.push(this.sendToWebhook(data));
            
            // 2. E-Mail Versand (optional)
            promises.push(this.sendEmail(data));
            
            // 3. Zapier/Make.com Integration (optional)
            promises.push(this.sendToAutomation(data));
            
            // 4. Lokale Speicherung als Backup
            this.saveLocalBackup(data);
            
            // Warten auf alle Versandoptionen
            const results = await Promise.allSettled(promises);
            
            // Erfolg wenn mindestens eine Option funktioniert hat
            const hasSuccess = results.some(result => result.status === 'fulfilled');
            
            if (hasSuccess) {
                console.log('✅ Konfiguration erfolgreich gesendet:', data);
                this.showSuccessMessage();
            } else {
                throw new Error('Alle Versandoptionen fehlgeschlagen');
            }
            
        } catch (error) {
            console.error('❌ Fehler beim Senden:', error);
            this.showNotification('Fehler beim Senden der Anfrage. Die Daten wurden lokal gespeichert.', 'error');
            
            // Bei Fehler: Lokale Speicherung und Download-Option anbieten
            this.saveLocalBackup(data);
            this.offerDownload(data);
        }
    }
    
    showSuccessMessage() {
        // Generate detailed prompt for the configuration
        const detailedPrompt = this.generateDetailedPrompt();
        
        // Replace content with success message
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                        <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-6">
                            <i class="fas fa-check"></i>
                        </div>
                        <h2 class="text-3xl font-bold text-white mb-4">
                            Vielen Dank für Ihre Anfrage!
                        </h2>
                        <p class="text-lg text-slate-300 mb-6">
                            Wir haben Ihre Website-Konfiguration erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.
                        </p>
                        <div class="bg-slate-700/50 rounded-lg p-4 mb-6">
                            <p class="text-sm text-slate-400 mb-2">Ihre Auswahl:</p>
                            <p class="text-white font-semibold">${this.typeNames[this.selectedType]} - ${this.totalPrice.toLocaleString('de-DE')}€</p>
                        </div>
                        
                        <!-- Prompt Sektion -->
                        <div class="bg-slate-700/30 rounded-lg p-6 mb-6 text-left">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-lg font-semibold text-white">Detaillierter Entwicklungs-Prompt</h3>
                                <button id="copy-prompt-btn" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2">
                                    <i class="fas fa-copy"></i>
                                    <span>Kopieren</span>
                                </button>
                            </div>
                            <div class="bg-slate-800/50 rounded-lg p-4 max-h-64 overflow-y-auto">
                                <pre id="detailed-prompt" class="text-sm text-slate-300 whitespace-pre-wrap font-mono">${detailedPrompt}</pre>
                            </div>
                        </div>
                        
                        <div class="space-y-3">
                            <a href="index.html" class="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200">
                                <i class="fas fa-home"></i>
                                <span>Zur Startseite</span>
                            </a>
                            <br>
                            <a href="konfigurator.html" class="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-colors duration-200">
                                <i class="fas fa-redo"></i>
                                <span>Neue Konfiguration</span>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            // Add copy functionality
            setTimeout(() => {
                const copyBtn = document.getElementById('copy-prompt-btn');
                const promptText = document.getElementById('detailed-prompt');
                
                if (copyBtn && promptText) {
                    copyBtn.addEventListener('click', async () => {
                        try {
                            await navigator.clipboard.writeText(promptText.textContent);
                            copyBtn.innerHTML = '<i class="fas fa-check"></i><span>Kopiert!</span>';
                            copyBtn.classList.replace('bg-blue-500', 'bg-green-500');
                            copyBtn.classList.replace('hover:bg-blue-600', 'hover:bg-green-600');
                            
                            setTimeout(() => {
                                copyBtn.innerHTML = '<i class="fas fa-copy"></i><span>Kopieren</span>';
                                copyBtn.classList.replace('bg-green-500', 'bg-blue-500');
                                copyBtn.classList.replace('hover:bg-green-600', 'hover:bg-blue-600');
                            }, 2000);
                        } catch (err) {
                            console.error('Fehler beim Kopieren:', err);
                            this.showNotification('Fehler beim Kopieren in die Zwischenablage', 'error');
                        }
                    });
                }
            }, 100);
        }
    }
    
    generateDetailedPrompt() {
        const form = document.getElementById('project-form');
        const formData = new FormData(form);
        
        // Vollständiger Basis-Prompt
        let prompt = `Erstelle eine moderne, wartbare, responsive und DSGVO-konforme Webseite auf Basis folgender Anforderungen. Achte auf sauberen, modularen Code, eine klare Projektstruktur und aktuelle Best Practices.

Die Seite soll performant, sicher, barrierefrei und mobilfreundlich sein. Der Code soll übersichtlich, effizient und gut wartbar sein – geeignet für professionelle Kundenprojekte.

Beachte dabei folgende Punkte:

## Modularer Aufbau
- Komponenten aufteilen (z. B. Header.jsx, Footer.jsx, Card.jsx)
- Vermeide große All-in-One-Dateien
- Nutze eine klare Verzeichnisstruktur: /components, /pages, /styles, /assets etc.
- Wiederverwendbare Komponenten statt Copy-Paste

## Sicherheit
- Validierung aller Benutzereingaben
- Absicherung von Formularen (z. B. Honeypot, Captcha)
- Keine geheimen Daten (z. B. API-Keys) im Frontend oder Git
- In Produktion Content-Security-Policy und sichere Header verwenden (z. B. Helmet in React)

## Performance & Wartbarkeit
- Reduzierung unnötiger CSS und States
- Keine console.log in der Produktion
- Lazy Loading für Bilder und Komponenten
- Kein übermäßiger Einsatz von useEffect
- Kommentare nur bei komplexem Code
- Entferne ungenutzte Pakete vor dem Build

## Barrierefreiheit (Accessibility)
- Alt-Texte bei Bildern
- Buttons mit klaren Beschriftungen (nicht nur Icons)
- Bedienbarkeit per Tastatur

## Responsives Design
- Mobile-First mit Tailwind oder Media Queries
- Viewport anpassen: <meta name="viewport" content="width=device-width, initial-scale=1">
- Cursor-Code unbedingt mobil testen

## Rechtliche Vorgaben (DSGVO)
- Impressum und Datenschutz-Seite verpflichtend
- Cookie-Banner nur bei Tracking
- Google Fonts nur lokal einbinden

## Build & Deployment
- .env.production für Umgebungsvariablen
- Produktion mit npm run build testen
- Build-Ordner nicht als Quellcode verwenden

## KI-Kontrolle
- Generierter Code muss immer geprüft, verstanden und angepasst werden
- Test auf verschiedenen Geräten
- Setze deinen eigenen Stil um – du bist der Architekt

## SPEZIFISCHE PROJEKT-ANFORDERUNGEN

**Website-Typ:** ${this.typeNames[this.selectedType]}
**Preis-Kategorie:** ${this.totalPrice.toLocaleString('de-DE')}€

**Firmeninformationen:**
- Firma: ${formData.get('companyName') || 'Nicht angegeben'}
- Branche: ${formData.get('industry') === 'other' ? formData.get('customIndustry') : formData.get('industry') || 'Nicht angegeben'}

**Design-Vorgaben:**
- Farbschema: ${this.getColorSchemeName(this.selectedColorScheme)}${this.selectedColorScheme === 'custom' && this.customColors ? ` (Primary: ${this.customColors.primary}, Secondary: ${this.customColors.secondary}, Tertiary: ${this.customColors.tertiary})` : ''}
- Design-Stil: ${this.getDesignStyleName(this.selectedDesignStyle)}

**Funktionale Anforderungen:**`;

        // Features hinzufügen
        if (this.selectedFeatures.size > 0) {
            prompt += `\n- Features: `;
            const featureDescriptions = {
                'seo': 'SEO-Optimierung (Meta-Tags, strukturierte Daten, semantisches HTML)',
                'analytics': 'Analytics-Integration (Google Analytics 4 oder Alternative)',
                'booking': 'Terminbuchungs-System',
                'multilingual': 'Mehrsprachigkeit (mindestens DE/EN)',
                'chat': 'Live-Chat-Integration',
                'newsletter': 'Newsletter-Anmeldung'
            };
            
            const selectedFeatureList = Array.from(this.selectedFeatures).map(feature => {
                const isRequired = this.isFeatureRequired(feature);
                const status = isRequired ? '(INKLUDIERT)' : '(ZUSÄTZLICH)';
                return `  • ${featureDescriptions[feature]} ${status}`;
            }).join('\n');
            
            prompt += `\n${selectedFeatureList}`;
        }

        // Bild-Anforderungen
        if (this.selectedImageTypes.size > 0) {
            prompt += `\n\n**Bild-Anforderungen:**`;
            const imageDescriptions = {
                'upload': 'Verwende die vom Kunden bereitgestellten Bilder (optimiere sie für Web)',
                'stock': 'Nutze hochwertige, lizenzfreie Stock-Bilder (z.B. Unsplash, Pexels)',
                'ai': 'Integriere Platzhalter für KI-generierte Bilder mit entsprechenden Prompts'
            };
            
            Array.from(this.selectedImageTypes).forEach(imageType => {
                prompt += `\n- ${imageDescriptions[imageType]}`;
            });
            
            if (this.selectedImageTypes.has('upload') && this.uploadedFiles.length > 0) {
                prompt += `\n- Anzahl bereitgestellter Bilder: ${this.uploadedFiles.length}`;
            }
        }

        // Projekt-Beschreibung
        const projectDescription = formData.get('projectDescription');
        if (projectDescription && projectDescription.trim()) {
            prompt += `\n\n**Projekt-Beschreibung:**\n${projectDescription.trim()}`;
        }

        // Inspirationen
        const inspirations = formData.get('inspirations');
        if (inspirations && inspirations.trim()) {
            prompt += `\n\n**Design-Inspirationen:**\n${inspirations.trim()}`;
        }

        // Timeline
        const timeline = formData.get('timeline');
        if (timeline) {
            const timelineTexts = {
                'asap': 'So schnell wie möglich',
                '1-week': '1 Woche',
                '2-weeks': '2 Wochen', 
                '1-month': '1 Monat',
                '2-months': '2+ Monate'
            };
            prompt += `\n\n**Zeitrahmen:** ${timelineTexts[timeline] || timeline}`;
        }

        // Zusätzliche Notizen
        const additionalNotes = formData.get('additionalNotes');
        if (additionalNotes && additionalNotes.trim()) {
            prompt += `\n\n**Zusätzliche Anforderungen:**\n${additionalNotes.trim()}`;
        }

        // Technische Anforderungen basierend auf Website-Typ
        const typeSpecificRequirements = {
            'landing': `
**WICHTIG: ONE-PAGE WEBSITE**

**1. Technologie & Sicherheit:**
- Stack: HTML + CSS + Vanilla JS
- Basis-Sicherheit:
  * HTTPS/SSL
  * Input-Validierung für Formulare
  * XSS-Schutz
  * Simple CSRF-Token
  * Rate Limiting für Lead-Formulare
  * Honeypot-Felder gegen Spam

**2. Technische Anforderungen:**
- Single-Page-Layout mit klarem Call-to-Action
- Conversion-optimiert (A/B-Test-freundlich)
- Schnelle Ladezeiten (< 2 Sekunden)
- Lead-Generierung-Formulare
- Mobile-First Ansatz`,
            'business': `
**WICHTIG: MULTI-PAGE WEBSITE**

**1. Technologie & Sicherheit nach Projektgröße:**

KLEINE BUSINESS WEBSITE:
- Stack: HTML + CSS + Vanilla JS
- Basis-Sicherheit:
  * HTTPS/SSL
  * Input-Validierung
  * XSS-Schutz
  * Simple CSRF-Token
  * Rate Limiting für Formulare

MITTLERE BUSINESS WEBSITE:
- Stack: HTML + CSS + JS + Alpine.js/jQuery
- Erweiterte Sicherheit:
  * HTTPS/SSL mit HSTS
  * Content Security Policy (CSP)
  * Advanced Input Validation
  * CSRF-Protection
  * Rate Limiting
  * Security Headers
  * Cookie Security
  * Captcha bei Formularen

GROßE BUSINESS WEBSITE:
- Stack: React + Next.js/Vite
- Enterprise Sicherheit:
  * HTTPS/SSL mit HSTS & Preloading
  * Strict CSP
  * JWT/Session Management
  * OAuth/SSO Integration
  * Advanced Rate Limiting
  * DDoS Protection
  * Security Monitoring
  * Automatische Updates
  * Regelmäßige Security Audits
  * 2FA wo sinnvoll

- Mindestens folgende Seiten:
  * index.html / Index.tsx (Startseite)
  * about.html / About.tsx (Über uns)
  * services.html / Services.tsx (Leistungen)
  * contact.html / Contact.tsx (Kontakt)
  * imprint.html / Imprint.tsx (Impressum)

- Professionelles Corporate Design
- Kontaktformular mit Validierung
- Google Maps Integration
- Responsive Navigation
- Cross-Browser kompatibel`,
            'ecommerce': `
**WICHTIG: E-COMMERCE PLATTFORM**

**1. Technologie & Sicherheit:**
- Stack: React + Next.js/Vite + Node.js Backend
- Enterprise E-Commerce Sicherheit:
  * HTTPS/SSL mit HSTS & Preloading
  * PCI DSS Compliance für Zahlungen
  * Strict CSP & Security Headers
  * JWT/Session Management
  * OAuth/SSO Integration
  * Brute Force Protection
  * DDoS Protection
  * Payment Gateway Security
  * Verschlüsselte Kundendaten
  * 2FA für Admin-Bereich
  * Automatische Sicherheitsupdates
  * Regelmäßige Sicherheitsaudits

**2. Technische Anforderungen:**
- Produktkatalog mit Such- und Filterfunktion
- Warenkorb-Funktionalität
- Sicherer Checkout-Prozess
- Produktdetailseiten mit Bildergalerien
- Benutzer-Authentifizierung
- Bestellverfolgung
- Admin-Dashboard`,
            'portfolio': `
- Projekt-Galerie mit Kategorien
- Lightbox für Bildansicht
- Download-Bereich für CV/Portfolio
- Testimonials-Sektion`,
            'blog': `
- Blog-Archiv mit Kategorien und Tags
- Artikel-Template mit Social Sharing
- Kommentarfunktion (kann extern sein)
- RSS-Feed`,
            'consulting': `
- Service-Übersicht mit Preisen
- Terminbuchungs-Integration
- Case Studies / Referenzen
- FAQ-Sektion`
        };

        // Wichtige Code-Regeln hinzufügen
        prompt += `\n\n## WICHTIGE CODE-REGELN (UNBEDINGT BEACHTEN!)

**CSS & Styling:**
- Verwende KEIN klassisches CSS und erstelle KEINE style.css
- Nutze ausschließlich Tailwind CSS-Klassen für Layout, Farben, Abstände etc.
- Verwende KEINE Inline-Styles, außer in absoluten Sonderfällen
- Entferne unnötige Klassen oder Logik – halte den Code schlank und sauber

**Code-Struktur:**
- Der Code soll modular und wartbar sein: Trenne Komponenten klar
- Schreibe zugänglichen HTML/JSX-Code (barrierefrei, alt-Texte, semantisch sinnvoll)
- Der Code muss responsiv sein (Mobile-First denken, Tailwind Breakpoints verwenden)
- Verwende keine sensiblen Daten im Frontend (z. B. API-Keys)
- Füge bei React-Komponenten sinnvolle Props und Type-Hinweise ein
- Der Code soll direkt in einem echten Projekt verwendbar sein – KEIN Pseudo-Code

**Website-Typ spezifische Anforderungen:**`;
        
        prompt += typeSpecificRequirements[this.selectedType] || '';

        prompt += `\n\n## TECHNISCHE UMSETZUNG

Der generierte Code muss:
- Sofort lauffähig sein ohne weitere Anpassungen
- Professionelle Qualität für Kundenprojekte haben
- Vollständig dokumentiert und verständlich sein
- Alle modernen Web-Standards einhalten
- Optimiert für Performance und SEO sein

Erstelle eine vollständige, produktionsreife Lösung die alle diese Anforderungen erfüllt!`;

        return prompt;
    }
    
    // === CRM INTEGRATION METHODEN ===
    
    getFeaturesWithStatus() {
        return Array.from(this.selectedFeatures).map(feature => ({
            feature: feature,
            name: this.getFeatureName(feature),
            isRequired: this.isFeatureRequired(feature),
            price: this.prices.features[feature] || 0,
            status: this.isFeatureRequired(feature) ? 'INKLUDIERT' : 'ZUSÄTZLICH'
        }));
    }
    
    generateConfigurationId() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        return `CONF-${timestamp}-${random}`.toUpperCase();
    }
    
    async sendToWebhook(data) {
        // HIER DEINE WEBHOOK-URL EINTRAGEN!
        const webhookUrl = 'https://your-crm-webhook.com/api/konfigurator'; // ← ANPASSEN!
        
        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Source': 'Website-Konfigurator',
                    'X-Version': '1.0'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`Webhook Error: ${response.status}`);
            }
            
            console.log('✅ Webhook erfolgreich gesendet');
            return await response.json();
            
        } catch (error) {
            console.error('❌ Webhook Fehler:', error);
            throw error;
        }
    }
    
    async sendEmail(data) {
        // E-Mail Integration (z.B. mit EmailJS oder Backend)
        const emailData = {
            to: 'dein-email@domain.de', // ← DEINE E-MAIL EINTRAGEN!
            subject: `Neue Website-Konfiguration: ${data.companyName} (${data.configurationId})`,
            template: 'website-konfigurator',
            data: data
        };
        
        try {
            // EmailJS Beispiel (erfordert EmailJS Setup)
            if (typeof emailjs !== 'undefined') {
                await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailData);
                console.log('✅ E-Mail erfolgreich gesendet');
                return true;
            }
            
            // Oder Backend-API
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(emailData)
            });
            
            if (!response.ok) throw new Error('E-Mail API Error');
            
            console.log('✅ E-Mail erfolgreich gesendet');
            return await response.json();
            
        } catch (error) {
            console.log('ℹ️ E-Mail-Versand nicht konfiguriert oder fehlgeschlagen:', error);
            throw error;
        }
    }
    
    async sendToAutomation(data) {
        // Zapier Webhook oder Make.com Integration
        const zapierWebhook = 'https://hooks.zapier.com/hooks/catch/your-hook-id/'; // ← ZAPIER HOOK URL!
        
        try {
            const response = await fetch(zapierWebhook, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    source: 'Website-Konfigurator',
                    action: 'new-configuration'
                })
            });
            
            if (!response.ok) throw new Error('Automation Webhook Error');
            
            console.log('✅ Automation erfolgreich ausgelöst');
            return true;
            
        } catch (error) {
            console.log('ℹ️ Automation nicht konfiguriert oder fehlgeschlagen:', error);
            throw error;
        }
    }
    
    saveLocalBackup(data) {
        try {
            // In localStorage für Debugging/Backup
            const backup = {
                id: data.configurationId,
                timestamp: data.timestamp,
                data: data
            };
            
            localStorage.setItem(`konfigurator_backup_${data.configurationId}`, JSON.stringify(backup));
            
            // Liste aller Backups aktualisieren
            const backups = JSON.parse(localStorage.getItem('konfigurator_backups') || '[]');
            backups.push({
                id: data.configurationId,
                timestamp: data.timestamp,
                company: data.companyName,
                type: data.websiteTypeName
            });
            
            // Nur die letzten 10 Backups behalten
            if (backups.length > 10) {
                const oldest = backups.shift();
                localStorage.removeItem(`konfigurator_backup_${oldest.id}`);
            }
            
            localStorage.setItem('konfigurator_backups', JSON.stringify(backups));
            
            console.log('✅ Lokales Backup erstellt:', data.configurationId);
            
        } catch (error) {
            console.error('❌ Lokales Backup fehlgeschlagen:', error);
        }
    }
    
    offerDownload(data) {
        // CSV und JSON Download anbieten
        const csvData = this.convertToCSV(data);
        const jsonData = JSON.stringify(data, null, 2);
        
        // Download-Links erstellen
        this.createDownloadLink(csvData, `konfigurator_${data.configurationId}.csv`, 'text/csv');
        this.createDownloadLink(jsonData, `konfigurator_${data.configurationId}.json`, 'application/json');
        
        this.showNotification('Download-Links wurden erstellt. Daten sind lokal verfügbar.', 'info');
    }
    
    convertToCSV(data) {
        const headers = [
            'Konfigurations-ID', 'Zeitstempel', 'Firma', 'Branche', 'Website-Typ', 
            'Gesamtpreis', 'Features', 'Kontakt-Name', 'E-Mail', 'Telefon'
        ];
        
        const row = [
            data.configurationId,
            data.timestamp,
            data.companyName,
            data.industry === 'other' ? data.customIndustry : data.industry,
            data.websiteTypeName,
            data.totalPrice,
            data.featuresWithStatus.map(f => `${f.name} (${f.status})`).join('; '),
            data.contactName,
            data.contactEmail,
            data.contactPhone
        ];
        
        return [headers, row].map(r => r.map(field => `"${field}"`).join(',')).join('\n');
    }
    
    createDownloadLink(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // URL nach Download freigeben
        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
            type === 'error' ? 'bg-red-500 text-white' : 
            type === 'success' ? 'bg-green-500 text-white' : 
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    toggleCustomIndustryField() {
        const industrySelect = document.getElementById('industry');
        const customIndustryField = document.getElementById('custom-industry-field');
        
        if (!industrySelect || !customIndustryField) return;
        
        if (industrySelect.value === 'other') {
            customIndustryField.classList.remove('hidden');
            // Focus the custom input field
            setTimeout(() => {
                const customInput = document.getElementById('custom-industry');
                if (customInput) {
                    customInput.focus();
                }
            }, 100);
        } else {
            customIndustryField.classList.add('hidden');
            // Clear the custom input when hidden
            const customInput = document.getElementById('custom-industry');
            if (customInput) {
                customInput.value = '';
            }
        }
    }
    
    initCharacterCounters() {
        // Project Description Counter
        const projectDescription = document.getElementById('project-description');
        const projectCounter = document.getElementById('project-description-counter');
        
        if (projectDescription && projectCounter) {
            const updateProjectCounter = () => {
                const length = projectDescription.value.length;
                const maxLength = projectDescription.getAttribute('maxlength') || 2000;
                projectCounter.textContent = `${length} / ${maxLength} Zeichen`;
                
                // Color coding: red when approaching limit
                if (length > maxLength * 0.9) {
                    projectCounter.className = 'text-xs text-red-400';
                } else if (length > maxLength * 0.75) {
                    projectCounter.className = 'text-xs text-yellow-400';
                } else {
                    projectCounter.className = 'text-xs text-slate-400';
                }
            };
            
            projectDescription.addEventListener('input', updateProjectCounter);
            updateProjectCounter(); // Initial count
        }
        
        // Inspirations Counter
        const inspirations = document.getElementById('inspirations');
        const inspirationsCounter = document.getElementById('inspirations-counter');
        
        if (inspirations && inspirationsCounter) {
            const updateInspirationsCounter = () => {
                const length = inspirations.value.length;
                const maxLength = inspirations.getAttribute('maxlength') || 1000;
                inspirationsCounter.textContent = `${length} / ${maxLength} Zeichen`;
                
                // Color coding: red when approaching limit
                if (length > maxLength * 0.9) {
                    inspirationsCounter.className = 'text-xs text-red-400 ml-4 flex-shrink-0';
                } else if (length > maxLength * 0.75) {
                    inspirationsCounter.className = 'text-xs text-yellow-400 ml-4 flex-shrink-0';
                } else {
                    inspirationsCounter.className = 'text-xs text-slate-400 ml-4 flex-shrink-0';
                }
            };
            
            inspirations.addEventListener('input', updateInspirationsCounter);
            updateInspirationsCounter(); // Initial count
        }
    }
}

// Initialize when DOM is loaded
let konfigurator;
document.addEventListener('DOMContentLoaded', () => {
    konfigurator = new WebsiteKonfigurator();
});