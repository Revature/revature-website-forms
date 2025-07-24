import { HttpClient } from '@angular/common/http';
import { Component, HostListener, AfterViewInit, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ENV_VAR, MAJORS, US_SCHOOLS, MEXICO_STATE_VALUES, MEXICO_SCHOOLS } from '../common/form-contants';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SharedService } from '../common/shared.service';

declare const Dropbox: any;

@Component({
  selector: 'app-b2c-form',
  templateUrl: './b2c-form.component.html',
  styleUrl: './b2c-form.component.scss',
})
export class B2cFormComponent implements AfterViewInit, OnInit {
  @Input('isfederalworker') public isFederalWorker: boolean = false;
  @Input('thankyouextensionurl') public thankyouExtensionUrl: string = '';

  form: FormGroup;

  graduationYears: number[] = [];
  showSponsorshipFields: boolean = false;
  showFutureSponsorshipFields: boolean = false;

  fileError: string = '';
  fileSuccess: string = '';
  loading = false;
  showSubmitButton = true;
  dropboxReady = false;

  filteredMajors: any[] = [];
  filteredSchools: any[] = [];
  formAuditValue = {
    school: {
      label: '',
      value: '',
    },
    major: {
      label: '',
      value: '',
    },
  };
  focusedControl: any = {
    school: false,
    major: false,
  };
  schools = US_SCHOOLS;

  dropdownStates: any = {
    country: false,
    state: false,
    canadaState: false,
    mexicoState: false,
    indiaState: false,
    levelOfEducation: false,
    branch: false,
    graduationMonth: false,
    graduationYear: false,
    programmingExperience: false,
    disabilityType: false,
  };

  countries = [
    { value: 'United States', label: 'United States' },
    { value: 'Mexico', label: 'Mexico' },
    { value: 'Canada', label: 'Canada' },
    { value: 'United Kingdom', label: 'United Kingdom' },
    { value: 'India', label: 'India' },
  ];

  usStates = [
    { label: 'AL', value: 'Alabama' },
    { label: 'AK', value: 'Alaska' },
    { label: 'AZ', value: 'Arizona' },
    { label: 'AR', value: 'Arkansas' },
    { label: 'CA', value: 'California' },
    { label: 'CO', value: 'Colorado' },
    { label: 'CT', value: 'Connecticut' },
    { label: 'DE', value: 'Delaware' },
    { label: 'DC', value: 'District of Columbia' },
    { label: 'FL', value: 'Florida' },
    { label: 'GA', value: 'Georgia' },
    { label: 'HI', value: 'Hawaii' },
    { label: 'ID', value: 'Idaho' },
    { label: 'IL', value: 'Illinois' },
    { label: 'IN', value: 'Indiana' },
    { label: 'IA', value: 'Iowa' },
    { label: 'KS', value: 'Kansas' },
    { label: 'KY', value: 'Kentucky' },
    { label: 'LA', value: 'Louisiana' },
    { label: 'ME', value: 'Maine' },
    { label: 'MD', value: 'Maryland' },
    { label: 'MA', value: 'Massachusetts' },
    { label: 'MI', value: 'Michigan' },
    { label: 'MN', value: 'Minnesota' },
    { label: 'MS', value: 'Mississippi' },
    { label: 'MO', value: 'Missouri' },
    { label: 'MT', value: 'Montana' },
    { label: 'NE', value: 'Nebraska' },
    { label: 'NV', value: 'Nevada' },
    { label: 'NH', value: 'New Hampshire' },
    { label: 'NJ', value: 'New Jersey' },
    { label: 'NM', value: 'New Mexico' },
    { label: 'NY', value: 'New York' },
    { label: 'NC', value: 'North Carolina' },
    { label: 'ND', value: 'North Dakota' },
    { label: 'OH', value: 'Ohio' },
    { label: 'OK', value: 'Oklahoma' },
    { label: 'OR', value: 'Oregon' },
    { label: 'PA', value: 'Pennsylvania' },
    { label: 'PR', value: 'Puerto Rico' },
    { label: 'RI', value: 'Rhode Island' },
    { label: 'SC', value: 'South Carolina' },
    { label: 'SD', value: 'South Dakota' },
    { label: 'TN', value: 'Tennessee' },
    { label: 'TX', value: 'Texas' },
    { label: 'UT', value: 'Utah' },
    { label: 'VT', value: 'Vermont' },
    { label: 'VA', value: 'Virginia' },
    { label: 'WA', value: 'Washington' },
    { label: 'WV', value: 'West Virginia' },
    { label: 'WI', value: 'Wisconsin' },
    { label: 'WY', value: 'Wyoming' },
  ];

  canadaProvinces = [
    { value: 'Alberta', label: 'Alberta' },
    { value: 'British Columbia', label: 'British Columbia' },
    { value: 'Manitoba', label: 'Manitoba' },
    { value: 'New Brunswick', label: 'New Brunswick' },
    { value: 'Newfoundland and Labrador', label: 'Newfoundland and Labrador' },
    { value: 'Northwest Territories', label: 'Northwest Territories' },
    { value: 'Nova Scotia', label: 'Nova Scotia' },
    { value: 'Nunavut', label: 'Nunavut' },
    { value: 'Ontario', label: 'Ontario' },
    { value: 'Prince Edward Island', label: 'Prince Edward Island' },
    { value: 'Quebec', label: 'Quebec' },
    { value: 'Saskatchewan', label: 'Saskatchewan' },
    { value: 'Yukon', label: 'Yukon' },
  ];

  indiaStates = [
    {
      value: 'Andaman and Nicobar Islands',
      label: 'Andaman and Nicobar Islands',
    },
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' },
    { value: 'Chandigarh', label: 'Chandigarh' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
    { value: 'Daman and Diu', label: 'Daman and Diu' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Dadra and Nagar Haveli', label: 'Dadra and Nagar Haveli' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Jharkhand', label: 'Jharkhand' },
    { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Lakshadweep', label: 'Lakshadweep' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Puducherry', label: 'Puducherry' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Sikkim', label: 'Sikkim' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Telangana', label: 'Telangana' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'West Bengal', label: 'West Bengal' },
  ];

  indiaDegrees = [
    { value: 'Bachelor of Arts', label: 'Bachelor of Arts' },
    { value: 'Bachelor of Science', label: 'Bachelor of Science' },
    { value: 'Bachelor of Engineering', label: 'Bachelor of Engineering' },
    { value: 'Bachelor of Technology', label: 'Bachelor of Technology' },
    {
      value: 'Bachelor of Business Administration',
      label: 'Bachelor of Business Administration',
    },
    { value: 'Bachelor of Commerce', label: 'Bachelor of Commerce' },
    {
      value: 'Bachelor of Computer Application',
      label: 'Bachelor of Computer Application',
    },
    {
      value: 'Bachelor of Corporate Secretaryship',
      label: 'Bachelor of Corporate Secretaryship',
    },
    { value: 'Master of Arts', label: 'Master of Arts' },
    { value: 'Master of Science', label: 'Master of Science' },
    { value: 'Master of Engineering', label: 'Master of Engineering' },
    { value: 'Master of Technology', label: 'Master of Technology' },
    {
      value: 'Master of Business Administration',
      label: 'Master of Business Administration',
    },
    { value: 'Master of Commerce', label: 'Master of Commerce' },
    {
      value: 'Master of Computer Application',
      label: 'Master of Computer Application',
    },
    {
      value: 'Master of Corporate Secretaryship',
      label: 'Master of Corporate Secretaryship',
    },
    { value: 'High School', label: 'Other' },
  ];

  graduationMonths = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  programmingExpOptions = [
    { value: 'No', label: 'None' },
    { value: '0-1 year', label: '0-1 year' },
    { value: '1-3 years', label: '1-3 years' },
    { value: '3-5 years', label: '3-5 years' },
    { value: '5+ years', label: '5+ years' },
  ];

  states = MEXICO_STATE_VALUES;

  uploadImages = {
    computer: {
      default: 'https://cdn.prod.website-files.com/665dfe6f26741ce6ca5a2d67/687a566342e4f5cb94aa0285_computer_arrow_up%20(1).svg',
      hover: 'https://cdn.prod.website-files.com/665dfe6f26741ce6ca5a2d67/687a566639afb6f59491bbe7_computer_arrow_up.svg'
    },
    dropbox: {
      default: 'https://cdn.prod.website-files.com/665dfe6f26741ce6ca5a2d67/687a5669a80a6d4c1a833008_backup.svg',
      hover: 'https://cdn.prod.website-files.com/665dfe6f26741ce6ca5a2d67/687a6e6c5b8ccc0bbd3c4f52_dropbox%20selected%20icon%202.svg'
    }
  };

  currentUploadImages = {
    computer: this.uploadImages.computer.default,
    dropbox: this.uploadImages.dropbox.default
  };

  activeUploadMethod: 'computer' | 'dropbox' | null = null;

  branches = [
    { value: 'a0A0d00000cwoOcEAI', label: 'Computer Science and Engineering' },
    {
      value: 'a0A3g000000sYkcEAE',
      label: 'Electronics and Communication Engineering',
    },
    { value: 'a0A0P00001ZJyDgUAL', label: 'Electrical Engineering' },
    {
      value: 'a0A6g00000G3QB0EAN',
      label: 'Electrical and Electronics Engineering',
    },
    { value: 'a0AVS000004Ud6T2AS', label: 'Circuital' },
    { value: 'a0A0P00001ZJyDjUAL', label: 'Information Technology' },
    { value: 'a0A0P00001ZJyDHUA1', label: 'Civil Engineering' },
    { value: 'a0A0P00001ZJyDqUAL', label: 'Mechanical Engineering' },
    { value: 'a0A0P00001ZJyCLUA1', label: 'Unlisted' },
  ];

  branches2 = [
    { value: 'a0A0P00001ZJyCKUA1', label: 'Agriculture' },
    { value: 'a0AVS000004So612AC', label: 'Animation' },
    { value: 'a0A0P00001ZJyD8UAL', label: 'Biochemistry' },
    { value: 'a0AVS000004So7d2AC', label: 'Biology' },
    { value: 'a0AVS000004SoAr2AK', label: 'Biotechnology' },
    { value: 'a0AVS000004SoCT2A0', label: 'Botany' },
    { value: 'a0A0P00001ZJyDGUA1', label: 'Chemistry' },
    { value: 'a0A0P00001ZJyDNUA1', label: 'Computer Science' },
    { value: 'a0A0P00001ZJyDTUA1', label: 'Economics' },
    { value: 'a0A0d00000cwGRSEA2', label: 'Fashion Design' },
    { value: 'a0A0P00001ZJyDaUAL', label: 'Geography' },
    { value: 'a0A0P00001ZJyCiUAL', label: 'Hospitality/Tourism' },
    { value: 'a0AVS000002SEJp2AO', label: 'Information Technology' },
    { value: 'a0A0P00001ZJyDpUAL', label: 'Mathematics' },
    { value: 'a0A0d00000cvdt5EAA', label: 'Microbiology' },
    { value: 'a0A0P00001ZJyDtUAL', label: 'Nursing' },
    { value: 'a0A0P00001ZJyDvUAL', label: 'Physics' },
    { value: 'a0A0P00001ZJyCJUA1', label: 'Zoology' },
    { value: 'a0A0P00001ZJyCLUA1', label: 'Unlisted' },
  ];

  branches3 = [
    { value: 'a0A0P00001ZJyDWUA1', label: 'English/Literature' },
    { value: 'a0A0P00001ZJyDTUA1', label: 'Economics' },
    { value: 'a0A0P00001ZJyCFUA1', label: 'Sociology' },
    { value: 'a0A0P00001ZJyDcUAL', label: 'History' },
    { value: 'a0AVS000004SoE52AK', label: 'Archaeology' },
    { value: 'a0A0P00001ZJyDwUAL', label: 'Political Science' },
    { value: 'a0A0d00000cxOcvEAE', label: 'Religious and Peace Studies' },
    { value: 'a0A0P00001ZJyDyUAL', label: 'Psychology' },
    { value: 'a0A0d00000cvrB5EAI', label: 'Communication Studies' },
    { value: 'a0A0P00001ZJyDuUAL', label: 'Philosophy' },
    { value: 'a0A0P00001ZJyCLUA1', label: 'Unlisted' },
  ];

  certificationTopicsList = [
    'Cloud Computing',
    'Security & Cybersecurity',
    'Project Management',
    'Data & Analytics',
    'AI & Machine Learning',
    'Programming & Software Development',
    'Network & Infrastructure',
    'DevOps & Site Reliability Engineering (SRE)',
    'Database Management',
    'IT Service Management',
    'Automation Testing',
    'Others',
  ];

  disabilityTypesList = [
    { value: 'Blindness', label: 'Blindness' },
    { value: 'Low vision', label: 'Low vision' },
    { value: 'Hearing impairment', label: 'Hearing impairment' },
    { value: 'Locomotor disability', label: 'Locomotor disability' },
    { value: 'Dwarfism', label: 'Dwarfism' },
    { value: 'Intellectual disability', label: 'Intellectual disability' },
    { value: 'Mental illness', label: 'Mental illness' },
    {
      value: 'Speech and language disability',
      label: 'Speech and language disability',
    },
    { value: 'Multiple disabilities', label: 'Multiple disabilities' },
    { value: 'Cerebral palsy', label: 'Cerebral palsy' },
    { value: 'Others', label: 'Others' },
  ];

  languagesList = [
    'English',
    'Spanish',
    'Mandarin Chinese',
    'Hindi',
    'Japanese',
    'French',
    'Arabic',
    'Portuguese',
    'Bengali',
    'Russian',
    'German',
    'Korean',
    'Italian',
    'Vietnamese',
    'Dutch',
    'Polish',
    'Turkish',
    'Hebrew',
    'Urdu',
    'Tagalog',
    'Farsi (Persian)',
    'Thai',
    'Greek',
    'Others',
  ];

  multiselectDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    searchPlaceholderText: 'Search...',
  };

  multiselectDropdownSettingsWithoutSelectAll: IDropdownSettings = {
    singleSelection: false,
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    searchPlaceholderText: 'Search...',
    enableCheckAll: false,
  };

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private sharedService: SharedService
  ) {
    this.initForm();
    this.initDropbox();
  }

  ngOnInit() {
    if (this.isFederalWorker && this.form) {
      this.form.get('currentStudent')?.setValue('no');

      this.form.addControl(
        'displacedWorker',
        this.fb.control('', Validators.required)
      );
      this.form.addControl('displacedWorkerAgency', this.fb.control(''));
      this.form.addControl('federalExperienceYears', this.fb.control(''));
      this.form.addControl('securityClearance', this.fb.control(''));
      this.form.addControl('securityClearanceType', this.fb.control(''));

      this.form.get('displacedWorker')?.valueChanges.subscribe((value) => {
        this.handleDisplacedWorkerChange(value);
      });

      this.form.get('securityClearance')?.valueChanges.subscribe((value) => {
        this.handleSecurityClearanceChange(value);
      });
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      // Full Name
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],

      // Contact Information
      email: ['', [Validators.required, this.validateEmail]],
      phone: ['', [Validators.required, this.validatePhone.bind(this)]],

      // Country
      country: ['', [Validators.required]],

      // Location Fields (Dynamic based on country selection)
      city: [''],
      state: [''],
      zip: ['', [Validators.pattern('^[0-9]{5}$')]], // US ZIP
      canadaState: [''],
      canadaZip: ['', [Validators.pattern('^[a-zA-Z0-9]{6}$')]], // Canada ZIP
      ukZip: ['', [Validators.pattern('^[a-zA-Z0-9]{7}$')]], // UK ZIP

      // Current Student
      currentStudent: ['', [Validators.required]],

      // Education Fields (Dynamic based on country and current student selection)
      levelOfEducation: ['', [Validators.required]],
      branch: [''],
      major: [''],
      majorID: [''],
      school: [''],
      schoolID: [''],
      graduationMonth: [''],
      graduationYear: [''],

      // Willingness to Relocate
      willingToRelocate: ['', [Validators.required]],

      // Programming Experience
      programmingExperience: ['', [Validators.required]],

      // Work Authorization
      workAuthorization: ['', [Validators.required]],
      sponsorship: [''],
      futureSponsorship: [''],

      // Resume Upload
      resumeURL: [''],
      computer_data: [''],
      computer_data_result: [''],
      FileBase64: [''],
      FileExt: [''],
      dropbox: [''],
      Resumedropbox: [''],

      // Privacy Consent
      dataConsent: [false],

      // reCAPTCHA
      validCaptacha: [''],

      // India-Specific Fields
      majorGrade: ['', [Validators.pattern('^.{1,3}$')]], // Score in Degree (in %)
      '12thGrade': ['', [Validators.pattern('^.{1,3}$')]], // Score in 12th Board exam (in %)
      '10thGrade': ['', [Validators.pattern('^.{1,3}$')]], // Score in 10th Board exam (in %)

      // Other Degree/Branch field
      otherDegree: [''],

      // India Hiring Fields
      hasCertifications: [''],
      certificationTopics: [[]],
      certificationDetails: [''],
      hasInternships: [''],
      internships: this.fb.array([]),
      disability: [''],
      disabilityType: [''],
      disabilityTypeOthers: [''],
      gender: [''],
      language: [[]],
      languageOthers: [''],
    });

    this.form.get('phone')?.valueChanges.subscribe((value) => {
      this.formatPhoneNumber(value);
    });

    // Dynamic Validations Based on Country Selection
    this.form.get('country')?.valueChanges.subscribe((country) => {
      if (
        this.form.value.country ||
        (!this.form.value.country && country != 'United States')
      )
        this.form.get('phone')?.setValue('', { emitEvent: false });
      this.handleCountryChange(country);
    });

    // Dynamic Validations Based on Current Student Selection
    this.form
      .get('currentStudent')
      ?.valueChanges.subscribe((currentStudent) => {
        this.handleCurrentStudentChange(currentStudent);
      });

    this.form.get('branch')?.valueChanges.subscribe((selectedValue) => {
      this.onBranchChange(selectedValue);
    });

    // Dynamic Validations Based on Work Authorization Selection
    this.form
      .get('workAuthorization')
      ?.valueChanges.subscribe((workAuthorization) => {
        this.handleWorkAuthorizationChange(workAuthorization);
      });

    // Add dynamic validators for future sponsorship fields
    this.form.get('sponsorship')?.valueChanges.subscribe((value) => {
      this.handleSponsorshipChange(value);
    });

    // Add handlers for certification and internship fields
    this.form.get('hasCertifications')?.valueChanges.subscribe((value) => {
      this.handleCertificationsChange(value);
    });

    this.form.get('hasInternships')?.valueChanges.subscribe((value) => {
      this.handleInternshipsChange(value);
    });

    this.form.get('disability')?.valueChanges.subscribe((value) => {
      this.handleDisabilityChange(value);
    });

    this.form.get('disabilityType')?.valueChanges.subscribe((value) => {
      this.handleDisabilityTypeChange(value);
    });

    this.form.get('language')?.valueChanges.subscribe((value) => {
      this.handleLanguageChange(value);
    });

    this.form.get('majorGrade')?.valueChanges.subscribe((value) => {
      this.handleIndiaGradeChange(value, 'majorGrade');
    });

    this.form.get('12thGrade')?.valueChanges.subscribe((value) => {
      this.handleIndiaGradeChange(value, '12thGrade');
    });

    this.form.get('10thGrade')?.valueChanges.subscribe((value) => {
      this.handleIndiaGradeChange(value, '10thGrade');
    });
  }

  private initDropbox(): void {
    const script = document.createElement('script');
    script.src = 'https://www.dropbox.com/static/api/2/dropins.js';
    script.id = 'dropboxjs';
    script.dataset['appKey'] = 'lcc592yiomt2omy';
    script.addEventListener('load', () => {
      this.dropboxReady = true;
    });
    document.body.appendChild(script);
  }

  private validatePhone(control: any): { [key: string]: boolean } | null {
    if (!control.value) {
      return null;
    }
    const country = this.form ? this.form.get('country')?.value : null;
    const value = control.value;

    if (!country || country === 'United States') {
      const digits = value.replace(/\D/g, '');
      const phoneRegExp = /^\d{10}$/;
      if (digits[0] === '1' || !phoneRegExp.test(digits)) {
        return { invalidPhone: true };
      }
    } else if (country === 'Mexico') {
      if (!value.startsWith('+52')) {
        return { invalidPhone: true };
      }
      const remaining = value.slice(4);
      if (!/^\d*$/.test(remaining) || remaining.length < 8) {
        return { invalidPhone: true };
      }
      if (value.length > 15) {
        return { invalidPhone: true };
      }
    } else if (country === 'United Kingdom') {
      if (!value.startsWith('+44')) {
        return { invalidPhone: true };
      }
      const remaining = value.slice(4);
      if (!/^\d*$/.test(remaining) || remaining.length < 8) {
        return { invalidPhone: true };
      }
      if (value.length > 15) {
        return { invalidPhone: true };
      }
    } else if (country === 'India') {
      if (!value.startsWith('+91')) {
        return { invalidPhone: true };
      }
      const remaining = value.slice(4);
      if (!/^\d*$/.test(remaining) || remaining.length < 10) {
        return { invalidPhone: true };
      }
      if (value.length > 14) {
        return { invalidPhone: true };
      }
    } else if (country === 'Canada') {
      if (!/^\d*$/.test(value) || value.length < 8) {
        return { invalidPhone: true };
      }
      if (value.length > 10) {
        return { invalidPhone: true };
      }
    }
    return null;
  }

  private validateEmail(control: any): { [key: string]: boolean } | null {
    if (control.value === null || control.value === '') {
      return null;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]+$/;

    return emailPattern.test(control.value) ? null : { invalidEmail: true };
  }

  private formatPhoneNumber(phone: string): void {
    const phoneControl = this.form.get('phone');
    if (!phoneControl) return;
    const country = this.form.get('country')?.value;

    if (!country || country === 'United States') {
      let formattedPhone = phone.replace(/\D/g, '');
      if (formattedPhone.length === 10) {
        formattedPhone = formattedPhone.replace(
          /^(\d{3})(\d{3})(\d{4})$/,
          '($1) $2-$3'
        );
      } else if (formattedPhone.length > 6) {
        formattedPhone = formattedPhone.replace(
          /^(\d{3})(\d{3})(\d*)$/,
          '($1) $2-$3'
        );
      } else if (formattedPhone.length > 3) {
        formattedPhone = formattedPhone.replace(/^(\d{3})(\d*)$/, '($1) $2');
      } else if (formattedPhone.length > 0) {
        formattedPhone = '(' + formattedPhone;
      }
      phoneControl.setValue(formattedPhone, { emitEvent: false });
    } else if (country === 'Mexico') {
      let value = phone.replace(/\D/g, '');
      if (!value.startsWith('+52 ')) {
        value = '+52 ' + value.replace(/^\+?52/, '');
      }
      phoneControl.setValue(value, { emitEvent: false });
    } else if (country === 'United Kingdom') {
      let value = phone.replace(/\D/g, '');
      if (!value.startsWith('+44 ')) {
        value = '+44 ' + value.replace(/^\+?44/, '');
      }
      phoneControl.setValue(value, { emitEvent: false });
    } else if (country === 'India') {
      let value = phone.replace(/\D/g, '');
      if (!value.startsWith('+91 ')) {
        value = '+91 ' + value.replace(/^\+?91/, '');
      }
      phoneControl.setValue(value, { emitEvent: false });
    } else {
      phoneControl.setValue(phone.replace(/\D/g, ''), { emitEvent: false });
    }
  }

  handleIndiaGradeChange(value: string, formControl: string): void {
    value = value.replace(/\D/g, '');
    if (value.length > 0) {
      if (!value.endsWith('%')) {
        value = value + '%';
      }
    }
    this.form.get(formControl)?.setValue(value, { emitEvent: false });
  }

  get phoneMaxLength(): number {
    const country = this.form.get('country')?.value;
    if (country === 'Mexico' || country === 'United Kingdom') return 15;
    if (country === 'United States') return 14;
    if (country === 'India') return 14;
    if (country === 'Canada') return 10;
    return 14;
  }

  private handleCountryChange(country: string): void {
    this.form.get('zip')?.setValue('');
    this.form.get('canadaZip')?.setValue('');
    this.form.get('ukZip')?.setValue('');
    if (country === 'United States' || country === 'Mexico') {
      this.form
        .get('zip')
        ?.setValidators([
          Validators.required,
          Validators.minLength(5),
          Validators.pattern('^[0-9]+$'),
        ]);
      this.form.get('canadaZip')?.clearValidators();
      this.form.get('ukZip')?.clearValidators();
    } else if (country === 'Canada') {
      this.form
        .get('canadaZip')
        ?.setValidators([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^[a-zA-Z0-9]+$'),
        ]);
      this.form.get('zip')?.clearValidators();
      this.form.get('ukZip')?.clearValidators();
    } else if (country === 'United Kingdom') {
      this.form
        .get('ukZip')
        ?.setValidators([
          Validators.required,
          Validators.minLength(7),
          Validators.pattern('^[a-zA-Z0-9]+$'),
        ]);
      this.form.get('zip')?.clearValidators();
      this.form.get('canadaZip')?.clearValidators();
    } else {
      this.form.get('zip')?.clearValidators();
      this.form.get('canadaZip')?.clearValidators();
      this.form.get('ukZip')?.clearValidators();
    }

    this.form.get('zip')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('canadaZip')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('ukZip')?.updateValueAndValidity({ emitEvent: false });

    this.form.get('city')?.setValue('');
    this.form.get('state')?.setValue('');
    this.form.get('canadaState')?.setValue('');
    if (country === 'United States' || country === 'Mexico') {
      this.form.get('city')?.setValidators([Validators.required]);
      this.form.get('state')?.setValidators([Validators.required]);
      this.form.get('canadaState')?.clearValidators();
    } else if (country === 'Canada') {
      this.form.get('canadaState')?.setValidators([Validators.required]);
      this.form.get('city')?.clearValidators();
      this.form.get('state')?.clearValidators();
    } else if (country === 'United Kingdom') {
      this.form.get('city')?.setValidators([Validators.required]);
      this.form.get('state')?.clearValidators();
      this.form.get('canadaState')?.clearValidators();
    } else if (country === 'India') {
      this.form.get('state')?.setValidators([Validators.required]);
      this.form.get('city')?.clearValidators();
      this.form.get('canadaState')?.clearValidators();
    } else {
      this.form.get('city')?.clearValidators();
      this.form.get('state')?.clearValidators();
      this.form.get('canadaState')?.clearValidators();
    }

    this.form.get('city')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('state')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('canadaState')?.updateValueAndValidity({ emitEvent: false });

    this.form.get('workAuthorization')?.setValue('');
    if (country === 'India') {
      this.form
        .get('majorGrade')
        ?.setValidators([Validators.required, Validators.pattern('^.{1,3}$')]);
      this.form
        .get('12thGrade')
        ?.setValidators([Validators.required, Validators.pattern('^.{1,3}$')]);
      this.form
        .get('10thGrade')
        ?.setValidators([Validators.required, Validators.pattern('^.{1,3}$')]);
      this.form.get('workAuthorization')?.clearValidators();

      this.form.get('hasCertifications')?.setValidators([Validators.required]);
      this.form.get('hasInternships')?.setValidators([Validators.required]);
      this.form.get('disability')?.setValidators([Validators.required]);
      this.form.get('gender')?.setValidators([Validators.required]);
    } else {
      this.form.get('workAuthorization')?.setValidators([Validators.required]);
      this.form.get('majorGrade')?.clearValidators();
      this.form.get('12thGrade')?.clearValidators();
      this.form.get('10thGrade')?.clearValidators();

      this.form.get('hasCertifications')?.clearValidators();
      this.form.get('hasInternships')?.clearValidators();
      this.form.get('disability')?.clearValidators();
      this.form.get('gender')?.clearValidators();

      this.form.get('majorGrade')?.setValue('');
      this.form.get('12thGrade')?.setValue('');
      this.form.get('10thGrade')?.setValue('');

      this.form.get('hasCertifications')?.setValue('');
      this.form.get('hasInternships')?.setValue('');
      this.form.get('disability')?.setValue('');
      this.form.get('gender')?.setValue('');
    }

    this.form
      .get('workAuthorization')
      ?.updateValueAndValidity({ emitEvent: false });
    this.form.get('majorGrade')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('12thGrade')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('10thGrade')?.updateValueAndValidity({ emitEvent: false });

    this.form
      .get('hasCertifications')
      ?.updateValueAndValidity({ emitEvent: false });
    this.form
      .get('hasInternships')
      ?.updateValueAndValidity({ emitEvent: false });
    this.form.get('disability')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('gender')?.updateValueAndValidity({ emitEvent: false });

    this.schools =
      this.form.value.country === 'Mexico' ? MEXICO_SCHOOLS : US_SCHOOLS;
    this.filterMajors(null);
    this.filterSchools(null);
    this.handleCurrentStudentChange(this.form.value.currentStudent);
    this.updateOtherDegreeValidation();
  }
  private handleCurrentStudentChange(currentStudent: string): void {
    this.calculateGraduationYears(currentStudent);

    this.form.get('levelOfEducation')?.setValue('');
    this.form.get('graduationMonth')?.setValue('');
    this.form.get('graduationYear')?.setValue('');
    this.form.get('major')?.setValue('');
    this.form.get('majorID')?.setValue('');
    this.form.get('school')?.setValue('');
    this.form.get('schoolID')?.setValue('');
    this.form.get('branch')?.setValue('');

    const country = this.form.get('country')?.value;
    this.form.get('levelOfEducation')?.setValidators([Validators.required]);
    if (country === 'United States' || country === 'Mexico') {
      this.form.get('major')?.setValidators([Validators.required]);
      this.form.get('school')?.setValidators([Validators.required]);
      this.form.get('branch')?.clearValidators();
    } else if (country === 'India') {
      this.form.get('major')?.clearValidators();
      this.form.get('school')?.clearValidators();
      this.form.get('branch')?.setValidators([Validators.required]);
    } else {
      this.form.get('major')?.clearValidators();
      this.form.get('school')?.clearValidators();
      this.form.get('branch')?.clearValidators();
    }
    if (currentStudent === 'yes' || (currentStudent && country === 'India')) {
      this.form.get('graduationMonth')?.setValidators([Validators.required]);
      this.form.get('graduationYear')?.setValidators([Validators.required]);
    } else {
      this.form.get('graduationMonth')?.clearValidators();
      this.form.get('graduationYear')?.clearValidators();
    }

    this.form
      .get('levelOfEducation')
      ?.updateValueAndValidity({ emitEvent: false });
    this.form
      .get('graduationMonth')
      ?.updateValueAndValidity({ emitEvent: false });
    this.form
      .get('graduationYear')
      ?.updateValueAndValidity({ emitEvent: false });
    this.form.get('major')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('majorID')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('school')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('schoolID')?.updateValueAndValidity({ emitEvent: false });
    this.form.get('branch')?.updateValueAndValidity({ emitEvent: false });
  }

  private onBranchChange(selectedValue: string): void {
    const selectedBranch = this.getBranchesArray().find(
      (branch) => branch.value === selectedValue
    );

    if (selectedBranch) {
      this.form.patchValue({
        major: selectedBranch.label,
        majorID: selectedBranch.value,
      });
    } else {
      this.form.patchValue({
        major: '',
        majorID: '',
      });
    }

    this.updateOtherDegreeValidation();
  }

  private handleWorkAuthorizationChange(workAuthorization: string): void {
    if (workAuthorization === 'yes') {
      this.showSponsorshipFields = true;
      this.form.get('sponsorship')?.setValidators([Validators.required]);
    } else {
      this.showSponsorshipFields = false;
      this.showFutureSponsorshipFields = false;
      this.form.get('sponsorship')?.clearValidators();
      this.form.get('sponsorship')?.setValue('');
      this.form.get('futureSponsorship')?.clearValidators();
      this.form.get('futureSponsorship')?.setValue('');
    }

    this.form.get('sponsorship')?.updateValueAndValidity({ emitEvent: false });
    this.form
      .get('futureSponsorship')
      ?.updateValueAndValidity({ emitEvent: false });
  }

  private handleSponsorshipChange(value: string): void {
    if (value === 'no') {
      this.showFutureSponsorshipFields = true;
      this.form.get('futureSponsorship')?.setValidators([Validators.required]);
    } else {
      this.showFutureSponsorshipFields = false;
      this.form.get('futureSponsorship')?.clearValidators();
      this.form.get('futureSponsorship')?.setValue('');
    }
    this.form
      .get('futureSponsorship')
      ?.updateValueAndValidity({ emitEvent: false });
  }

  filterMajors(event: any) {
    const query = event?.target?.value?.toLowerCase();
    this.filteredMajors = event
      ? MAJORS.sort((a, b) => a.label.localeCompare(b.label)).filter((major) =>
          major.label.toLowerCase().includes(query)
        )
      : MAJORS.sort((a, b) => a.label.localeCompare(b.label));
  }

  filterSchools(event: any) {
    const query = event?.target?.value?.toLowerCase();
    this.filteredSchools = event
      ? this.schools
          .sort((a, b) => a.label.localeCompare(b.label))
          .filter((school) => school.label.toLowerCase().includes(query))
      : this.schools.sort((a, b) => a.label.localeCompare(b.label));
  }

  selectAutoCompleteValue(event: any, formControl: string, ObjectValue: any) {
    event.stopPropagation();
    switch (formControl) {
      case 'major':
        this.form.patchValue({
          major: ObjectValue.label,
          majorID: ObjectValue.value,
        });
        this.formAuditValue.major = {
          label: ObjectValue.label,
          value: ObjectValue.value,
        };
        break;
      case 'school':
        this.form.patchValue({
          school: ObjectValue.label,
          schoolID: ObjectValue.value,
        });
        this.formAuditValue.school = {
          label: ObjectValue.label,
          value: ObjectValue.value,
        };
        break;
    }
    this.focusedControl[formControl] = false;
  }

  setFocusedControl(event: any, formControl: any, value: any) {
    event.preventDefault();
    this.focusedControl[formControl] = value;
    if (formControl === 'major') {
      if (
        this.formAuditValue.major.label !== this.form.value.major ||
        !this.form.value.majorID
      ) {
        this.form.get('major')?.setValue('');
        this.form.get('majorID')?.setValue('');
      }
      this.filterMajors(null);
    } else if (formControl === 'school') {
      if (
        this.formAuditValue.school.label !== this.form.value.school ||
        !this.form.value.schoolID
      ) {
        this.form.get('school')?.setValue('');
        this.form.get('schoolID')?.setValue('');
      }
      this.filterSchools(null);
    }
  }

  private calculateGraduationYears(currentStudent: string): void {
    const currentYear =
      currentStudent == 'yes'
        ? new Date().getFullYear()
        : new Date().getFullYear() - 2;
    const years = currentStudent == 'yes' ? 5 : 3;
    this.graduationYears = Array.from(
      { length: years },
      (_, i) => currentYear + i
    );
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.fileError = '';
    this.fileSuccess = '';

    const allowedExtensions = ['pdf', 'doc', 'docx', 'rtf', 'txt'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      this.fileError = 'Invalid file type.';
      this.resetActiveUploadMethod();
      return;
    }

    if (file.size > 5242880) {
      this.fileError = 'File size is too large.';
      this.resetActiveUploadMethod();
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const rawData = result.split('base64,')[1];

      this.form.patchValue({
        computer_data: file.name,
        computer_data_result: rawData,
        FileBase64: rawData,
        FileExt: file.type,
        Resumedropbox: '',
        dropbox: '',
      });

      this.fileSuccess = 'Resume ready to upload';
      this.setActiveUploadMethod('computer');
    };
    reader.readAsDataURL(file);
  }

  onDropboxClick(): void {
    if (!this.dropboxReady) {
      return;
    }

    Dropbox.choose({
      success: (files: any[]) => this.handleDropboxFileChange(files[0]),
      linkType: 'preview',
      multiselect: false,
      extensions: ['.doc', '.docx', '.pdf', '.txt', '.rtf'],
    });
  }

  handleDropboxFileChange(file: any): void {
    this.fileError = '';
    this.fileSuccess = '';

    if (file.bytes > 5242880) {
      this.fileError = 'File size is too large.';
      this.resetActiveUploadMethod();
      return;
    }
    const extension = file.link.split('/').pop().split('#')[0].split('?')[0];
    let url = file.link.replace('dl=0', 'dl=1');
    url = url?.trim();
    this.form.patchValue({
      computer_data: '',
      dropbox: url,
      Resumedropbox: extension,
    });

    this.fileSuccess = 'Resume ready to upload';
    this.setActiveUploadMethod('dropbox');
  }

  recaptchaSuccessCallback(response: any) {
    this.form.get('validCaptacha')?.setValue(response ? true : false);
  }

  async onSubmit(): Promise<void> {
    if (this.sharedService.hasSuspiciousContent(this.form.value)) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      if (
        !this.form.get('computer_data')?.value &&
        !this.form.get('dropbox')?.value
      ) {
        this.fileError = 'Please upload a resume.';
      }
      if (!this.form.get('validCaptacha')?.value) {
        this.form.get('validCaptacha')?.setValue(false);
      }

      this.scrollToFirstError();
      return;
    }

    if (
      !this.form.get('computer_data')?.value &&
      !this.form.get('dropbox')?.value
    ) {
      this.fileError = 'Please upload a resume.';
      return;
    }

    if (!this.form.get('validCaptacha')?.value) {
      this.form.get('validCaptacha')?.setValue(false);
      return;
    }

    this.loading = true;
    this.showSubmitButton = false;

    try {
      await this.uploadResume();
    } catch (error) {
      console.error('Error submitting resume:', error);
      alert('Error submitting resume, Please try again.');
      this.loading = false;
      this.showSubmitButton = true;
    }
  }

  private scrollToFirstError(): void {
    // Wait for Angular to update the DOM
    setTimeout(() => {
      const allErrorElements = document.querySelectorAll('.b2c-error-message');
      let errorElement;

      for (let i = 0; i < allErrorElements.length; i++) {
        const element = allErrorElements[i] as HTMLElement;
        if (element.offsetParent !== null) {
          errorElement = element;
          break;
        }
      }

      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }

  async uploadResume(): Promise<void> {
    const formData = this.form.value;
    if (formData.computer_data) {
      const response = await this.uploadFileViaApi(formData);
      if (response.success) {
        this.form.patchValue({ resumeURL: response.link });
        const formDataObject = this.prepareFormData();
        await this.submitForm(formDataObject);
      } else {
        this.fileError =
          'There was an error uploading your file. Please try again.';
        this.loading = false;
        this.showSubmitButton = true;
        throw new Error('Resume upload failed');
      }
    } else if (formData.dropbox) {
      const formDataObject = this.prepareFormData();
      await this.submitForm(formDataObject);
    } else {
      this.fileError = 'Please upload a resume.';
      this.loading = false;
      this.showSubmitButton = true;
      throw new Error('No resume uploaded');
    }
  }

  prepareFormData(): any {
    let formDataObject = { ...this.form.value };
    if (formDataObject.country === 'Canada') {
      formDataObject.zip = formDataObject.canadaZip;
      formDataObject.state = formDataObject.canadaState;
    } else if (formDataObject.country === 'United Kingdom') {
      formDataObject.zip = formDataObject.ukZip;
    } else if (formDataObject.country === 'India') {
      // Format certification topics as a string
      if (formDataObject.certificationTopics) {
        formDataObject.certificationTopics = formDataObject.certificationTopics
          .length
          ? JSON.stringify(formDataObject.certificationTopics)
          : '';
      }

      // Format internships as a string
      if (formDataObject.internships) {
        formDataObject.internships = formDataObject.internships.length
          ? JSON.stringify(formDataObject.internships)
          : '';
      }

      formDataObject.majorGrade = formDataObject.majorGrade.replace('%', '');
      formDataObject['12thGrade'] = formDataObject['12thGrade'].replace(
        '%',
        ''
      );
      formDataObject['10thGrade'] = formDataObject['10thGrade'].replace(
        '%',
        ''
      );
    }

    if (
      ['United Kingdom', 'Canada', 'United States', 'Mexico'].includes(
        formDataObject.country
      )
    ) {
      formDataObject.workAuthorization =
        formDataObject.workAuthorization === 'yes' &&
        formDataObject.sponsorship === 'no' &&
        formDataObject.futureSponsorship === 'no'
          ? 'Yes'
          : 'No';
    }

    if (
      formDataObject.disabilityType === 'Others' &&
      formDataObject.disabilityTypeOthers
    ) {
      formDataObject.disabilityType = `Others - ${formDataObject.disabilityTypeOthers}`;
    }

    delete formDataObject.disabilityTypeOthers;

    if (formDataObject.language.includes('Others')) {
      const othersIndex = formDataObject.language.indexOf('Others');
      if (formDataObject.languageOthers) {
        formDataObject.language[
          othersIndex
        ] = `Others - ${formDataObject.languageOthers}`;
      }
    }

    delete formDataObject.languageOthers;

    const queryParams = this.getQueryParams();
    const standardizedQuery = this.standardizeQueryParams(queryParams);

    formDataObject = {
      url: window?.location?.href.split('#')[0] || '',
      ApplicationDevice__c: window.innerWidth < 640 ? 'Mobile' : 'Desktop',
      irClickId: standardizedQuery?.irclickid || '',
      searchEngine: standardizedQuery?.searchengine || '',
      searchString: standardizedQuery?.srstring || '',
      payPerClickKeyword: standardizedQuery?.keyword || '',
      gCLID: standardizedQuery?.gclid || '',
      uTMTerm: standardizedQuery?.utm_term || '',
      uTMCampaign: standardizedQuery.utm_campaign || '',
      uTMContent: standardizedQuery.utm_content || '',
      uTMMedium: standardizedQuery.utm_medium || '',
      uTMSource: standardizedQuery.utm_source || '',
      uTMSchoolID: standardizedQuery.utm_schoolid || '',
      referrerURL: document.referrer || 'Direct',
      uTMReferrerName: standardizedQuery.utm_referrername || '',
      campaignvalue: standardizedQuery.campaignvalue || '',
      appcastClickID: '',
      sourcedBy: standardizedQuery.sourcedby || '',
      referredByEmail: standardizedQuery.referredByEmail || '',
      referredBy: standardizedQuery.ra || '',
      referredByUser: standardizedQuery.ru || '',
      dropbox: '',
      veteran: (window?.location?.href.split('#')[0] || '').includes('veteran'),
      Resumedropbox: '',
      ...formDataObject,
      leadDate: new Date().toISOString(),
      phone: ['Mexico', 'United Kingdom', 'India'].includes(
        formDataObject.country
      )
        ? '+' + formDataObject.phone.replace(/\D/g, '')
        : formDataObject.phone.replace(/\D/g, ''),
      FileBase64: '',
      FileExt: '',
      ResumeUpload: '',
      computer_data: '',
      computer_data_result: '',
      graduationDate: formDataObject.graduationMonth
        ? `${formDataObject.graduationYear}-${formDataObject.graduationMonth}-01`
        : '',
      leadType: 'Revature',
    };
    delete formDataObject['computer_data'];
    delete formDataObject['computer_data_result'];
    delete formDataObject['g-recaptcha-response'];
    return formDataObject;
  }

  async submitForm(formDataObject: any): Promise<void> {
    const apiUrl = ENV_VAR.FORM_API_ENDPOINT;
    const queryString = this.createQueryString(formDataObject); //new HttpParams({fromObject: formDataObject}).toString();
    const apiUrlWithParams = apiUrl + '?' + queryString;
    try {
      const response: any = await this.http.get(apiUrlWithParams).toPromise();
      if (response?.status === 'ok') {
        console.log('Form data submitted successfully');
      } else {
        console.error('Error submitting form data');
      }
      this.navigateToThankYouPage(formDataObject.firstName);
    } catch (error) {
      console.error('Error submitting form data:', error);
      alert('Error submitting form data, Please try again.');
      this.loading = false;
      this.showSubmitButton = true;
      throw error;
    }
  }

  navigateToThankYouPage(firstName: string): void {
    window.location.href = `/thank-you/${this.thankyouExtensionUrl}?name=${btoa(
      firstName
    )}`;
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
      standardizedQueryParams[lowercasedKey] = lowercasedKey.includes('utm')
        ? value.toLowerCase()
        : value;
    });
    return standardizedQueryParams;
  }

  createQueryString(data: any): string {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      )
      .join('&');
  }

  uploadFileViaApi(formData: any): Promise<any> {
    const payload = {
      key: '245583662863Rk863369',
      person: `${formData.firstName} ${formData.lastName}`,
      filename: formData.computer_data,
      file: formData.computer_data_result,
    };
    return this.http.post(ENV_VAR.RESUME_API_ENDPOINT, payload).toPromise();
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeCaptcha();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (typeof grecaptcha !== 'undefined') {
        grecaptcha.ready(() => {
          this.resizeCaptcha();
        });
      }
    }, 500);
  }

  private resizeCaptcha(): void {
    const reCaptchaElement = document.getElementsByTagName('re-captcha')[0];

    const captchaElem = reCaptchaElement?.getElementsByTagName(
      'div'
    )[0] as HTMLElement;
    if (!captchaElem) return;

    const captchaWidth = captchaElem?.offsetWidth;
    const parentWidth = reCaptchaElement?.parentElement?.offsetWidth;

    if (captchaWidth && parentWidth) {
      const scale = parentWidth / captchaWidth;
      captchaElem.style.transform = `scale(${scale < 1 ? scale : 1})`;
      captchaElem.style.transformOrigin = '0 0';
    }
  }

  private handleCertificationsChange(value: string): void {
    if (value === 'yes') {
      this.form
        .get('certificationTopics')
        ?.setValidators([Validators.required]);
      this.form
        .get('certificationDetails')
        ?.setValidators([Validators.required]);
    } else {
      this.form.get('certificationTopics')?.clearValidators();
      this.form.get('certificationDetails')?.clearValidators();
      this.form.get('certificationTopics')?.setValue([]);
      this.form.get('certificationDetails')?.setValue('');
    }
    this.form.get('certificationTopics')?.updateValueAndValidity();
    this.form.get('certificationDetails')?.updateValueAndValidity();
  }

  private handleInternshipsChange(value: string): void {
    const internshipsArray = this.form.get('internships') as FormArray;

    if (value === 'yes') {
      if (internshipsArray.length === 0) {
        this.addInternship();
      }
    } else {
      while (internshipsArray.length > 0) {
        internshipsArray.removeAt(0);
      }
    }
  }

  private handleDisabilityChange(value: string): void {
    if (value === 'yes') {
      this.form.get('disabilityType')?.enable();
    } else {
      this.form.get('disabilityType')?.disable();
      this.form.get('disabilityType')?.setValue('');
    }
  }

  private handleDisabilityTypeChange(value: string): void {
    if (value === 'Others') {
      this.form
        .get('disabilityTypeOthers')
        ?.setValidators([Validators.required]);
    } else {
      this.form.get('disabilityTypeOthers')?.clearValidators();
      this.form.get('disabilityTypeOthers')?.setValue('');
    }
    this.form.get('disabilityTypeOthers')?.updateValueAndValidity();
  }

  private handleLanguageChange(value: string): void {
    if (value.includes('Others')) {
      this.form.get('languageOthers')?.setValidators([Validators.required]);
    } else {
      this.form.get('languageOthers')?.clearValidators();
      this.form.get('languageOthers')?.setValue('');
    }
    this.form.get('languageOthers')?.updateValueAndValidity();
  }

  addInternship(): void {
    const internshipsArray = this.form.get('internships') as FormArray;

    // Limit to maximum 4 internships
    if (internshipsArray.length < 4) {
      const internshipGroup = this.fb.group({
        organization: ['', Validators.required],
        duration: [
          '',
          [Validators.required, Validators.pattern('^(?!0+$)\\d+$')],
        ],
        location: ['', Validators.required],
        technology: ['', Validators.required],
        role: ['', Validators.required],
      });

      internshipsArray.push(internshipGroup);
    }
  }

  removeInternship(index: number): void {
    const internshipsArray = this.form.get('internships') as FormArray;
    internshipsArray.removeAt(index);
  }

  get internshipsControls() {
    return (this.form.get('internships') as FormArray).controls;
  }

  private handleDisplacedWorkerChange(value: string): void {
    if (value === 'yes') {
      this.form
        .get('displacedWorkerAgency')
        ?.setValidators([Validators.required]);
      this.form
        .get('federalExperienceYears')
        ?.setValidators([
          Validators.required,
          Validators.pattern('^[0-9]+(.[0-9]+)?$'),
        ]);
      this.form.get('securityClearance')?.setValidators([Validators.required]);
    } else {
      this.form.get('displacedWorkerAgency')?.clearValidators();
      this.form.get('federalExperienceYears')?.clearValidators();
      this.form.get('securityClearance')?.clearValidators();

      this.form.get('displacedWorkerAgency')?.setValue('');
      this.form.get('federalExperienceYears')?.setValue('');
      this.form.get('securityClearance')?.setValue('');
      this.form.get('securityClearanceType')?.setValue('');
    }

    this.form
      .get('displacedWorkerAgency')
      ?.updateValueAndValidity({ emitEvent: false });
    this.form
      .get('federalExperienceYears')
      ?.updateValueAndValidity({ emitEvent: false });
    this.form
      .get('securityClearance')
      ?.updateValueAndValidity({ emitEvent: false });
  }

  private handleSecurityClearanceChange(value: string): void {
    if (value === 'yes') {
      this.form
        .get('securityClearanceType')
        ?.setValidators([Validators.required]);
    } else {
      this.form.get('securityClearanceType')?.clearValidators();
      this.form.get('securityClearanceType')?.setValue('');
    }

    this.form
      .get('securityClearanceType')
      ?.updateValueAndValidity({ emitEvent: false });
  }

  handleDegreeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.form.get('branch')?.setValue('');
    if (!this.showBranchField()) {
      this.form.get('branch')?.clearValidators();
    } else {
      this.form.get('branch')?.setValidators(Validators.required);
    }
    this.form.get('branch')?.updateValueAndValidity();
    this.updateOtherDegreeValidation();
  }

  showBranchField(): boolean {
    const degree = this.form.get('levelOfEducation')?.value;
    return [
      'Bachelor of Engineering',
      'Bachelor of Technology',
      'Master of Engineering',
      'Master of Technology',
      'Bachelor of Arts',
      'Master of Arts',
      'Bachelor of Science',
      'Master of Science',
    ].includes(degree);
  }

  getBranchesArray(): any[] {
    const degree = this.form.get('levelOfEducation')?.value;

    if (
      [
        'Bachelor of Engineering',
        'Bachelor of Technology',
        'Master of Engineering',
        'Master of Technology',
      ].includes(degree)
    ) {
      return this.branches;
    } else if (['Bachelor of Arts', 'Master of Arts'].includes(degree)) {
      return this.branches3;
    } else if (['Bachelor of Science', 'Master of Science'].includes(degree)) {
      return this.branches2;
    }

    return this.branches;
  }

  // Update otherDegree field validation based on levelOfEducation and branch selections
  private updateOtherDegreeValidation(): void {
    const levelOfEducation = this.form.get('levelOfEducation')?.value;
    const branch = this.form.get('branch')?.value;

    if (levelOfEducation === 'High School' || branch === 'a0A0P00001ZJyCLUA1') {
      this.form.get('otherDegree')?.setValidators([Validators.required]);
    } else {
      this.form.get('otherDegree')?.clearValidators();
      this.form.get('otherDegree')?.setValue('');
    }

    this.form.get('otherDegree')?.updateValueAndValidity({ emitEvent: false });
  }

  // Generic dropdown methods
  toggleDropdown(dropdownName: string): void {
    this.dropdownStates[dropdownName] = !this.dropdownStates[dropdownName];
    // Close other dropdowns
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

    // Handle special cases
    if (formControlName === 'levelOfEducation') {
      this.handleDegreeChange({ target: { value: item.value } } as any);
    }
  }

  getSelectedOption(formControlName: string, optionsArray: any[]): any {
    const selectedValue = this.form.get(formControlName)?.value;
    return optionsArray.find((option) => option.value === selectedValue);
  }

  // Generic method to get dropdown options based on dropdown type
  getDropdownOptions(dropdownType: string): any[] {
    switch (dropdownType) {
      case 'country':
        return this.countries;
      case 'usStates':
        return this.usStates;
      case 'canadaProvinces':
        return this.canadaProvinces;
      case 'indiaStates':
        return this.indiaStates;
      case 'mexicoStates':
        return this.states.map((state) => ({ value: state, label: state }));
      case 'indiaDegrees':
        return this.indiaDegrees;
      case 'branches':
        return this.getBranchesArray();
      case 'graduationMonths':
        return this.graduationMonths;
      case 'graduationYears':
        return this.graduationYears.map((year) => ({
          value: year,
          label: year.toString(),
        }));
      case 'programmingExperience':
        return this.programmingExpOptions;
      case 'disabilityTypes':
        return this.disabilityTypesList;
      default:
        return [];
    }
  }

  // Generic method to get placeholder text
  getDropdownPlaceholder(dropdownType: string): string {
    switch (dropdownType) {
      case 'country':
        return 'Select Country';
      case 'usStates':
      case 'mexicoStates':
      case 'indiaStates':
        return 'State';
      case 'canadaProvinces':
        return 'Province';
      case 'indiaDegrees':
      case 'branches':
        return 'Select an option';
      case 'graduationMonths':
        return 'Select a month';
      case 'graduationYears':
        return 'Select a year';
      case 'programmingExperience':
        return 'Select an option';
      case 'disabilityTypes':
        return 'Select disability type';
      default:
        return 'Select an option';
    }
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

  onUploadHover(uploadType: 'computer' | 'dropbox'): void {
    if (this.activeUploadMethod !== uploadType) {
      this.currentUploadImages[uploadType] = this.uploadImages[uploadType].hover;
    }
  }

  onUploadLeave(uploadType: 'computer' | 'dropbox'): void {
    if (this.activeUploadMethod !== uploadType) {
      this.currentUploadImages[uploadType] = this.uploadImages[uploadType].default;
    }
  }

  isUploadMethodActive(uploadType: 'computer' | 'dropbox'): boolean {
    return this.activeUploadMethod === uploadType;
  }

  setActiveUploadMethod(uploadType: 'computer' | 'dropbox'): void {
    if (this.activeUploadMethod) {
      this.currentUploadImages[this.activeUploadMethod] = this.uploadImages[this.activeUploadMethod].default;
    }
    
    this.activeUploadMethod = uploadType;
    this.currentUploadImages[uploadType] = this.uploadImages[uploadType].hover;
  }

  resetActiveUploadMethod(): void {
    if (this.activeUploadMethod) {
      this.currentUploadImages[this.activeUploadMethod] = this.uploadImages[this.activeUploadMethod].default;
      this.activeUploadMethod = null;
    }
  }
}