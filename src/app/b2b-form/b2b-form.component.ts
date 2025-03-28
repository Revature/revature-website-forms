import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, HostListener, Input } from '@angular/core';
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
  @Input('pdfname') public pdfName: string = 'Revature_file';
  @Input('downloadbtnid') public downloadBtnId: string = 'survey_download';
  @Input('isexternalurl') public isExternalURL: boolean = false;
  @Input('isextendedform') public isExtendedForm: boolean = false;
  @Input('showyourmessage') public showYourMessage: boolean = false;
  @Input('downloadmessage') public downloadMessage: string = "Let's Talk";
  @Input('ishorizontalform') public isHorizontalForm: boolean = false;

  form: FormGroup;
  loading = false;
  showSubmitButton = true;

  private readonly CONSUMER_EMAIL_TLDS = [
    "@gmail.",
    "@yahoo.",
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
    "@gmx."
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private sharedService: SharedService
  ) { }

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
      return;
    }
    if (this.isExtendedForm) {
      if (!this.form.get('validCaptacha')?.value) {
        this.form.get('validCaptacha')?.setValue(false);
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
    window.location.href = `/thank-you${this.thankyouExtensionUrl}?name=${btoa(firstName)}`;
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
}