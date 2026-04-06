import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, HostListener, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENV_VAR } from '../common/form-contants';
import { SharedService } from '../common/shared.service';

@Component({
  selector: 'app-b2b-form',
  templateUrl: './b2b-form.component.html',
  styleUrl: './b2b-form.component.scss'
})
export class B2bFormComponent implements AfterViewInit {
  @Input('actionurl') public actionUrl: string = '';
  @Input('thankyouextensionurl') public thankyouExtensionUrl: string = '';
  @Input('openthankyouinnewtab') public openThankYouInNewTabInput: any = false;
  @Input('pdfname') public pdfName: string = 'Revature_file';
  @Input('downloadbtnid') public downloadBtnId: string = 'survey_download';
  @Input('isexternalurl') public isExternalURL: boolean = false;
  @Input('isextendedform') public isExtendedForm: boolean = false;
  @Input('showyourmessage') public showYourMessage: boolean = false;
  @Input('downloadmessage') public downloadMessage: string = "Let's Talk";
  @Input('ishorizontalform') public isHorizontalForm: boolean = true;
  @Input('showpartnership') public showPartnership: boolean = false;
  @Input('showhowdidyouhear') public showHowDidYouHearInput: any = true;
  @Input('showfdetimeframe') public showFdeTimeframeInput: any = false;

  form: FormGroup;
  loading = false;
  showSubmitButton = true;

  dropdownStates: any = {
    partnershipType: false
  };

  partnershipTypes = [
    { value: 'university', label: 'University' },
    { value: 'technology', label: 'Technology' },
    { value: 'alliance', label: 'Alliance' }
  ];

  fdeTimeframeOptions = [
    { value: 'under-3-months', label: '<3 months' },
    { value: '3-6-months', label: '3-6 months' },
    { value: '6-9-months', label: '6-9 months' }
  ];

  howDidYouHearOptions = [
    { value: 'Referral', label: 'Referral' },
    { value: 'Event / Conference', label: 'Event / Conference' },
    { value: 'Webinar / Podcast', label: 'Webinar / Podcast' },
    { value: 'LinkedIn', label: 'LinkedIn' },
    { value: 'Social Media (Other)', label: 'Social Media (Other)' },
    { value: 'Google Search', label: 'Google Search' },
    { value: 'AI Chat Tools (ChatGPT, Copilot, Gemini, etc.)', label: 'AI Chat Tools (ChatGPT, Copilot, Gemini, etc.)' },
    { value: 'Press / Media', label: 'Press / Media' },
    { value: 'Revature Outreach', label: 'Revature Outreach' },
    { value: 'Existing Client / Partner', label: 'Existing Client / Partner' },
    { value: 'Other', label: 'Other' }
  ];

  private readonly CONSUMER_EMAIL_TLDS = [
    "@gmail.",
    "@yahoo.",
    "@yahoo.co.",
    "@hotmail.",
    "@live.",
    "@aol.",
    "@outlook.",
    "@att.",
    "@comcast.",
    "@earthlink.",
    "@googlemail.",
    "@mac.",
    "@mail.",
    "@me.",
    "@msn.",
    "@verizon.",
    "@t-online.",
    "@freenet.",
    "@1&1.",
    "@icloud.",
    "@gmx.",
    "@zohomail.",
    "@protonmail.",
    "@pm.",
    "@yandex.",
    "@fastmail.",
    "@hey.",
    "@rediffmail.",
    "@rediff.",
    "@in.",
    "@sify.",
    "@vsnl.",
    "@mailinator.",
    "@guerrillamail.",
    "@10minutemail.",
    "@temp-mail.",
    "@tempmailo.",
    "@throwawaymail.",
    "@dispostable.",
    "@maildrop.",
    "@getnada.",
    "@yopmail.",
    "@sharklasers.",
    "@trashmail."
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private sharedService: SharedService,
    private hostEl: ElementRef<HTMLElement>
  ) { }

  private normalizeBoolean(value: any, defaultValue: boolean): boolean {
    if (value === undefined || value === null || value === '') {
      return defaultValue;
    }
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return !!value;
  }

  get showHowDidYouHear(): boolean {
    return this.normalizeBoolean(this.showHowDidYouHearInput, true);
  }

  get showFdeTimeframe(): boolean {
    return this.normalizeBoolean(this.showFdeTimeframeInput, false);
  }

  get openThankYouInNewTab(): boolean {
    return this.normalizeBoolean(this.openThankYouInNewTabInput, false);
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, this.validateEmail.bind(this), this.businessEmailValidator.bind(this)]],
      howDidYouKnowAboutRevature: ['', this.showHowDidYouHear ? Validators.required : []],
      validCaptacha: ['']
    });

    if (this.isExtendedForm) {
      this.form.addControl('phone', this.fb.control('', [this.phoneValidator]));

      this.form.get('phone')?.valueChanges.subscribe((value) => {
        this.formatPhoneNumber(value);
      });
    }

    if (this.showYourMessage) {
      this.form.addControl('yourMessage', this.fb.control('', Validators.required));
    }

    if (this.showPartnership) {
      this.form.addControl('partnershipType', this.fb.control('', Validators.required));
    }

    if (this.showFdeTimeframe) {
      this.form.addControl('fdeTimeframe', this.fb.control('', Validators.required));
    }
  }

  private validateEmail(control: any): { [key: string]: boolean } | null {
    if (control.value === null || control.value === '' || this.businessEmailValidator(control)) {
      return null;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]+$/;

    return emailPattern.test(control.value) ? null : { invalidEmail: true };
  };

  businessEmailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const email = control.value;
    if (!email) return null;

    const isBusinessEmail = !this.CONSUMER_EMAIL_TLDS.some(tld => email.includes(tld));
    return isBusinessEmail ? null : { businessEmail: true };
  }

  phoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const phone = control.value?.replace(/\D/g, '');
    if (!phone) {
      return null;
    }
    const phoneRegExp = /^\d{6,14}$/;
    return phoneRegExp.test(phone) ? null : { invalidPhone: true };
  }

  private formatPhoneNumber(phone: string): void {
    const phoneControl = this.form.get('phone');
    if (!phoneControl) return;

    let formattedPhone = phone.replace(/\D/g, '');

    phoneControl.setValue(formattedPhone, { emitEvent: false });
  }

  recaptchaSuccessCallback(response: any): void {
    this.form.get('validCaptacha')?.setValue(response ? true : false);
  }

  toggleDropdown(dropdownName: string): void {
    this.dropdownStates[dropdownName] = !this.dropdownStates[dropdownName];
    Object.keys(this.dropdownStates).forEach((key) => {
      if (key !== dropdownName) {
        this.dropdownStates[key] = false;
      }
    });
  }

  selectDropdownValue(
    formControlName: string,
    item: any,
    event: Event,
    dropdownName: string
  ): void {
    event.stopPropagation();
    this.form.get(formControlName)?.setValue(item.value);
    this.dropdownStates[dropdownName] = false;
  }

  selectFdeTimeframe(value: string): void {
    this.form.get('fdeTimeframe')?.setValue(value);
  }

  getSelectedOption(formControlName: string, optionsArray: any[]): any {
    const selectedValue = this.form.get(formControlName)?.value;
    return optionsArray.find((option) => option.value === selectedValue);
  }

  getDropdownOptions(dropdownType: string): any[] {
    switch (dropdownType) {
      case 'partnershipTypes':
        return this.partnershipTypes;
      default:
        return [];
    }
  }

  getDropdownPlaceholder(dropdownType: string): string {
    switch (dropdownType) {
      case 'partnershipTypes':
        return 'Select Partnership Type';
      default:
        return 'Select an option';
    }
  }

  async onSubmit(): Promise<void> {
    if (this.sharedService.hasSuspiciousContent(this.form.value)) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      if (this.isExtendedForm) {
        if (!this.form.get('validCaptacha')?.value) {
          this.form.get('validCaptacha')?.setValue(false);
        }
      }
      this.scrollToFirstError();
      return;
    }
    if (this.isExtendedForm) {
      if (!this.form.get('validCaptacha')?.value) {
        this.form.get('validCaptacha')?.setValue(false);
        this.scrollToFirstError();
        return;
      }
    }

    this.loading = true;
    this.showSubmitButton = false;
    const formData = this.prepareFormData();
    await this.submitForm(formData);
  }

  private prepareFormData(): any {
    let formDataObject = { ...this.form.value };
    const queryParams = this.getQueryParams();
    const standardizedQuery = this.standardizeQueryParams(queryParams);

    formDataObject = {
      url: window?.location?.href.split('#')[0] || "",
      ApplicationDevice__c: window.innerWidth < 640 ? "Mobile" : "Desktop",
      irClickId: standardizedQuery?.irclickid || "",
      searchEngine: standardizedQuery?.searchengine || "",
      searchString: standardizedQuery?.srstring || "",
      payPerClickKeyword: standardizedQuery?.keyword || "",
      gCLID: standardizedQuery?.gclid || "",
      uTMTerm: standardizedQuery?.utm_term || "",
      uTMCampaign: standardizedQuery.utm_campaign || "",
      uTMContent: standardizedQuery.utm_content || "",
      uTMMedium: standardizedQuery.utm_medium || "",
      uTMSource: standardizedQuery.utm_source || "",
      uTMSchoolID: standardizedQuery.utm_schoolid || "",
      referrerURL: document.referrer || "Direct",
      uTMReferrerName: standardizedQuery.utm_referrername || "",
      campaignvalue: standardizedQuery.campaignvalue || "",
      appcastClickID: '',
      sourcedBy: standardizedQuery.sourcedby || "",
      referredByEmail: standardizedQuery.referredByEmail || "",
      referredBy: standardizedQuery.ra || "",
      referredByUser: standardizedQuery.ru || "",
      leadDate: new Date().toISOString(),
      ...formDataObject,
      leadType: "Business"
    };

    delete formDataObject["g-recaptcha-response"];
    return formDataObject
  }

  async submitForm(formDataObject: any): Promise<void> {
    const apiUrl = ENV_VAR.FORM_API_ENDPOINT;
    const queryString = this.createQueryString(formDataObject); //new HttpParams({fromObject: formDataObject}).toString();
    const apiUrlWithParams = apiUrl + '?' + queryString;
    try {
      const response: any = await this.http.get(apiUrlWithParams).toPromise();
      if (response?.status === "ok") {
        console.log('Form data submitted successfully');
        this.resetFormFields();
      } else {
        console.error('Error submitting form data');
      }
      if (this.actionUrl && !this.isExternalURL) {
        await this.downloadPdf(this.actionUrl, this.pdfName);
      } else if (this.actionUrl && this.isExternalURL) {
        window.open(this.actionUrl, '_self');
        return;
      } else if (!this.isExtendedForm) {
        console.error('Action URL not provided');
      }
      this.emitSubmittedEvent();
      this.navigateToThankYouPage(formDataObject.firstName);
    } catch (error) {
      console.error('Error submitting form data:', error);
      alert('Error submitting form data, Please try again.');
      throw error;
    } finally {
      this.loading = false;
      this.showSubmitButton = true;
    }
  }

  private resetFormFields(): void {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();

    Object.keys(this.dropdownStates).forEach((key) => {
      this.dropdownStates[key] = false;
    });

    if (this.isExtendedForm && typeof grecaptcha !== 'undefined') {
      grecaptcha.reset();
    }
  }

  async downloadPdf(actionUrl: string, pdfName: string): Promise<void> {
    try {
      const response = await fetch(actionUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = pdfName;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      throw error;
    }
  }

  navigateToThankYouPage(firstName: string): void {
    const url = `/thank-you/${this.thankyouExtensionUrl}?name=${btoa(firstName)}`;
    if (this.openThankYouInNewTab) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    window.location.href = url;
  }

  private emitSubmittedEvent(): void {
    try {
      this.hostEl?.nativeElement?.dispatchEvent(new CustomEvent('b2b:submitted', {
        bubbles: true,
        composed: true
      }));
    } catch {
      // no-op
    }
  }

  getQueryParams(): any {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams;
  }

  standardizeQueryParams(queryParams: any): any {
    const standardizedQueryParams: any = {};
    queryParams.forEach((value: any, key: any) => {
      if (key === 'slug') {
        return;
      }
      const lowercasedKey = key.toLowerCase();
      standardizedQueryParams[lowercasedKey] = lowercasedKey.includes('utm') ? value.toLowerCase() : value;
    });
    return standardizedQueryParams;
  }

  createQueryString(data: any): string {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  }

  @HostListener('window:resize')
  onResize() {
    this.isExtendedForm ? this.resizeCaptcha() : '';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      Object.keys(this.dropdownStates).forEach((key) => {
        this.dropdownStates[key] = false;
      });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (typeof grecaptcha !== 'undefined' && this.isExtendedForm) {
        grecaptcha.ready(() => {
          this.resizeCaptcha();
        });
      }
    }, 500);
  }

  private resizeCaptcha(): void {
    const reCaptchaElement = document.getElementsByTagName('re-captcha')[0];

    const captchaElem = reCaptchaElement?.getElementsByTagName('div')[0] as HTMLElement;
    if (!captchaElem) return;

    const captchaWidth = captchaElem?.offsetWidth;
    const parentWidth = reCaptchaElement?.parentElement?.offsetWidth;

    if (captchaWidth && parentWidth) {
      const scale = parentWidth / captchaWidth;
      captchaElem.style.transform = `scale(${scale < 1 ? scale : 1})`;
      captchaElem.style.transformOrigin = '0 0';
    }
  }

  private scrollToFirstError(): void {
    setTimeout(() => {
      const root = this.hostEl.nativeElement;
      if (!root) return;

      const invalidControlName = Object.keys(this.form.controls).find(
        (controlName) => this.form.get(controlName)?.invalid
      );

      let target: HTMLElement | null = null;

      if (invalidControlName) {
        switch (invalidControlName) {
          case 'partnershipType':
            target = root.querySelector('.custom-dropdown-button') as HTMLElement | null;
            break;
          case 'fdeTimeframe':
            target = root.querySelector('.fde-timeframe-options') as HTMLElement | null;
            break;
          default:
            target = root.querySelector(`[formControlName="${invalidControlName}"]`) as HTMLElement | null;
            break;
        }
      } else if (this.isExtendedForm && !this.form.get('validCaptacha')?.value) {
        target = root.querySelector('re-captcha') as HTMLElement | null;
      }

      if (!target) return;

      const focusTarget = target.matches('input, textarea, select, button')
        ? target
        : (target.querySelector('input, textarea, select, button') as HTMLElement | null);

      focusTarget?.focus({ preventScroll: true });
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }, 80);
  }
}