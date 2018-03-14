<template lang="html">
  <div class="sim-calendar" :class="componentClasses">

    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <symbol id="icon--event-duration" viewBox="0 0 14 14">
        <path class="icon--event-duration" fill="#f5a623" d="M12.5,7 L7,7 L7,1.5 C10.0375661,1.5 12.5,3.96243388 12.5,7 Z M7,1 C3.6862915,1 1,3.6862915 1,7 C1,10.3137085 3.6862915,13 7,13 C10.3137085,13 13,10.3137085 13,7 C13,3.6862915 10.3137085,1 7,1 Z M7,0 C10.8659932,-7.10171439e-16 14,3.13400675 14,7 C14,10.8659932 10.8659932,14 7,14 C3.13400675,14 -3.07926605e-15,10.8659932 -3.55271368e-15,7 C-4.73447626e-16,3.13400675 3.13400675,7.10171439e-16 7,0 Z"></path>
      </symbol>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <symbol id="icon--instructors-checked" viewBox="0 0 14 14">
        <path class="icon--instructors-checked" fill="#b8e986" d="M0.874370824,13.125 L8.89399073,13.125 L9.60441702,14 L0.86070878,14 C0.623898831,14 0.421247203,13.9134123 0.252747816,13.7402344 C0.0842484296,13.5670564 0,13.3619804 0,13.125 L0,11.8125 C0,11.566405 0.143450029,11.3590503 0.43035439,11.1904297 L0.86070878,10.9375 L4.69974318,9.11914062 C4.39917671,8.87304564 4.14415443,8.57910327 3.93466871,8.23730469 C3.72518298,7.8955061 3.55440914,7.54231953 3.42234205,7.17773437 C3.29027497,6.81314922 3.19464161,6.45996265 3.13543913,6.11816406 C3.07623664,5.77636548 3.04663584,5.48698035 3.04663584,5.25 L3.04663584,3.0625 C3.04663584,2.69791484 3.16048507,2.33333516 3.38818694,1.96875 C3.61588882,1.60416484 3.91645078,1.27604312 4.28988186,0.984375 C4.66331293,0.692706875 5.08455508,0.455730078 5.55362094,0.2734375 C6.0226868,0.0911449219 6.49857658,0 6.98130455,0 C7.46403252,0 7.9399223,0.0911449219 8.40898816,0.2734375 C8.87805402,0.455730078 9.29929617,0.692706875 9.67272724,0.984375 C10.0461583,1.27604312 10.3467203,1.60416484 10.5744222,1.96875 C10.802124,2.33333516 10.9159733,2.69791484 10.9159733,3.0625 L10.9159733,5.25 C10.9159733,5.51432424 10.8886494,5.81965973 10.834001,6.16601562 C10.7793525,6.51237152 10.6882732,6.8655581 10.5607601,7.22558594 C10.4332471,7.58561378 10.2670272,7.93424311 10.0620955,8.27148437 C9.85716381,8.60872564 9.60441852,8.89583215 9.30385205,9.1328125 L11.6673857,10.2402344 L11.148228,10.9785156 L8.93497686,9.92578125 C8.79835573,9.86197885 8.6845065,9.7685553 8.59342576,9.64550781 C8.50234501,9.52246032 8.44769738,9.38346432 8.42948123,9.22851562 C8.41126508,9.08268156 8.43175794,8.93912831 8.49096042,8.79785156 C8.55016291,8.65657481 8.63896531,8.53580779 8.75737028,8.43554687 C9.22188211,8.07096172 9.55204487,7.55371429 9.74786848,6.88378906 C9.9436921,6.21386384 10.0416024,5.66927293 10.0416024,5.25 L10.0416024,3.0625 C10.0416024,2.82551965 9.95280003,2.57942836 9.77519257,2.32421875 C9.59758511,2.06900914 9.3630557,1.83431097 9.0715973,1.62011719 C8.7801389,1.40592341 8.45225312,1.22819081 8.08793012,1.08691406 C7.72360712,0.945637314 7.35473562,0.875 6.98130455,0.875 C6.61698155,0.875 6.25266402,0.945637314 5.88834102,1.08691406 C5.52401802,1.22819081 5.19613224,1.40820203 4.90467384,1.62695312 C4.61321544,1.84570422 4.37640905,2.08268102 4.19424755,2.33789062 C4.01208605,2.59310023 3.92100666,2.83463428 3.92100666,3.0625 L3.92100666,5.25 C3.92100666,5.67838756 4.03030192,6.22525709 4.24889572,6.890625 C4.46748952,7.55599291 4.80448324,8.07096172 5.25988699,8.43554687 C5.37829196,8.53580779 5.46481738,8.65429619 5.51946583,8.79101562 C5.57411428,8.92773506 5.59233015,9.07356693 5.574114,9.22851562 C5.55589785,9.37434969 5.50125022,9.50878845 5.41016947,9.63183594 C5.31908872,9.75488343 5.2052395,9.84830697 5.06861837,9.91210937 L1.22958397,11.7304687 C1.1840436,11.7578126 1.11345707,11.8056637 1.01782229,11.8740234 C0.9221875,11.9423832 0.874370824,12.0631502 0.874370824,12.2363281 L0.874370824,13.125 Z M13.8259887,9.8984375 C13.9261775,9.97135453 13.9831021,10.0670567 13.9967642,10.1855469 C14.0104263,10.3040371 13.9808255,10.4088537 13.9079609,10.5 L11.8176682,13.6855469 C11.8085601,13.7128908 11.7971752,13.7379556 11.7835131,13.7607422 C11.7698509,13.7835288 11.7539121,13.8040364 11.7356959,13.8222656 C11.6446152,13.9042973 11.5398739,13.9453125 11.4214689,13.9453125 C11.3030639,13.9453125 11.1983226,13.9042973 11.1072419,13.8222656 L9.56343089,12.2773437 C9.48145821,12.1861975 9.44047249,12.0813808 9.44047249,11.9628906 C9.44047249,11.8444004 9.48145821,11.744141 9.56343089,11.6621094 C9.64540356,11.5709631 9.74786787,11.5253906 9.87082688,11.5253906 C9.99378589,11.5253906 10.0962502,11.5709631 10.1782229,11.6621094 L11.3394966,12.8242187 L13.2111967,9.96679688 C13.2840613,9.87565059 13.3819716,9.82096363 13.5049306,9.80273438 C13.6278896,9.78450512 13.7349079,9.81640584 13.8259887,9.8984375 Z"></path>
      </symbol>
      <symbol id="icon--instructors-exist" viewBox="0 0 14 14">
        <path class="icon--instructors-exist" fill="#96b3cb" d="M10.1992187,11.4185366 L10.5683594,11.6234146 C10.8144544,11.7600007 10.9375,11.9375599 10.9375,12.1560976 L10.9375,13.262439 C10.9375,13.471871 10.8645841,13.6471538 10.71875,13.7882927 C10.5729159,13.9294316 10.3997406,14 10.1992187,14 L0.73828125,14 C0.537759414,14 0.364584062,13.9294316 0.21875,13.7882927 C0.0729159375,13.6471538 0,13.471871 0,13.262439 L0,12.1560976 C0,11.9557714 0.123045645,11.782765 0.369140625,11.6370732 L0.73828125,11.4185366 L3.56835937,9.88878049 C3.04882553,9.47902234 2.68880309,8.93268634 2.48828125,8.2497561 C2.28775941,7.56682585 2.1875,7.02504265 2.1875,6.62439024 L2.1875,4.7804878 C2.1875,4.47089276 2.28320217,4.16357876 2.47460937,3.85853659 C2.66601658,3.55349441 2.91666512,3.27805001 3.2265625,3.03219512 C3.53645988,2.78634023 3.88964646,2.58601703 4.28613281,2.43121951 C4.68261917,2.27642199 5.0813782,2.19902439 5.48242187,2.19902439 C5.89258018,2.19902439 6.29361783,2.27642199 6.68554687,2.43121951 C7.07747592,2.58601703 7.42610524,2.78634023 7.73144531,3.03219512 C8.03678538,3.27805001 8.28287667,3.55349441 8.46972656,3.85853659 C8.65657646,4.16357876 8.75,4.47089276 8.75,4.7804878 L8.75,6.62439024 C8.75,7.07057134 8.6611337,7.62601294 8.48339844,8.29073171 C8.30566317,8.95545048 7.96159109,9.49268088 7.45117187,9.90243902 L10.1992187,11.4185366 Z M10.0625,13.1258537 L10.0625,12.3473171 C10.0351561,12.3199999 10.0032554,12.2972359 9.96679688,12.2790244 L9.85742188,12.2243902 C9.84830725,12.2243902 9.83691413,12.2198374 9.82324219,12.2107317 C9.80957024,12.201626 9.79361988,12.1925204 9.77539062,12.1834146 L7.02734375,10.6673171 C6.89973895,10.5944712 6.79492229,10.496586 6.71289063,10.3736585 C6.63085896,10.2507311 6.5852865,10.1164235 6.57617188,9.97073171 C6.55794262,9.82503992 6.57845022,9.68390312 6.63769531,9.54731707 C6.6969404,9.41073102 6.7858067,9.29691102 6.90429688,9.20585366 C7.27799666,8.91447009 7.53320244,8.49788889 7.66992188,7.95609756 C7.80664131,7.41430623 7.875,6.97040823 7.875,6.62439024 L7.875,4.7804878 C7.875,4.46178702 7.63574458,4.09756302 7.15722656,3.68780488 C6.67870854,3.27804673 6.1204459,3.07317073 5.48242188,3.07317073 C4.86262711,3.07317073 4.30436446,3.27804673 3.80761719,3.68780488 C3.31086991,4.09756302 3.0625,4.46178702 3.0625,4.7804878 L3.0625,6.62439024 C3.0625,6.97040823 3.14453043,7.41430623 3.30859375,7.95609756 C3.47265707,8.49788889 3.74153459,8.91447009 4.11523438,9.20585366 C4.22460992,9.29691102 4.30891897,9.41073102 4.36816406,9.54731707 C4.42740915,9.68390312 4.44791676,9.82503992 4.4296875,9.97073171 C4.42057287,10.1164235 4.37500041,10.2507311 4.29296875,10.3736585 C4.21093709,10.496586 4.10612043,10.5899184 3.97851563,10.6536585 L1.1484375,12.1970732 C1.13932287,12.1970732 1.13020838,12.1993496 1.12109375,12.2039024 C1.11197912,12.2084553 1.10286463,12.2152845 1.09375,12.2243902 C1.05729148,12.233496 1.01855489,12.2517072 0.977539063,12.2790244 L0.875,12.3473171 L0.875,13.1258537 L10.0625,13.1258537 Z M13.2617188,9.24682927 L13.6308594,9.45170732 C13.8769544,9.58829337 14,9.76585257 14,9.98439024 L14,11.0770732 C14,11.2865051 13.9270841,11.4617879 13.78125,11.6029268 C13.6354159,11.7440657 13.4622406,11.8146341 13.2617188,11.8146341 L11.8125,11.8146341 C11.7578122,11.6234137 11.7008467,11.4549601 11.6416016,11.3092683 C11.5823565,11.1635765 11.4889329,11.0406509 11.3613281,10.9404878 L13.125,10.9404878 L13.125,10.1619512 C13.0976561,10.1437397 13.0657554,10.1232521 13.0292969,10.1004878 C12.9928384,10.0777235 12.9563804,10.0617887 12.9199219,10.0526829 C12.9108072,10.0435772 12.8994141,10.036748 12.8857422,10.0321951 C12.8720702,10.0276423 12.8561199,10.0208131 12.8378906,10.0117073 L10.0488281,8.49560976 C9.92122332,8.42276386 9.81640666,8.32487866 9.734375,8.20195122 C9.65234334,8.07902378 9.60677088,7.94471618 9.59765625,7.79902439 C9.57942699,7.6533326 9.5999346,7.5121958 9.65917969,7.37560976 C9.71842478,7.23902371 9.80729107,7.12520371 9.92578125,7.03414634 C10.299481,6.73365703 10.5615227,6.31252303 10.7119141,5.77073171 C10.8623054,5.22894038 10.9375,4.78959518 10.9375,4.45268293 L10.9375,2.60878049 C10.9375,2.28097397 10.6914087,1.91219717 10.1992187,1.50243902 C9.70702879,1.09268088 9.14193027,0.887804878 8.50390625,0.887804878 C8.19400887,0.887804878 7.89550925,0.937885678 7.60839844,1.03804878 C7.32128763,1.13821188 7.06380322,1.27479588 6.8359375,1.44780488 C6.66275955,1.39317046 6.48046971,1.36130086 6.2890625,1.35219512 C6.09765529,1.34308939 5.9108082,1.33398379 5.72851562,1.32487805 C6.04752764,0.951542849 6.45767979,0.637399649 6.95898437,0.382439024 C7.46028896,0.1274784 7.97525777,0 8.50390625,0 C8.91406455,0 9.31738083,0.079674 9.71386719,0.23902439 C10.1103535,0.39837478 10.4635401,0.60097438 10.7734375,0.846829268 C11.0833349,1.09268416 11.3339834,1.37040496 11.5253906,1.68 C11.7167978,1.98959504 11.8125,2.29918544 11.8125,2.60878049 L11.8125,4.45268293 C11.8125,4.88975828 11.7167978,5.44292348 11.5253906,6.11219512 C11.3339834,6.78146676 10.9830755,7.31642076 10.4726562,7.71707317 L13.2617188,9.24682927 Z"></path>
      </symbol>
      <symbol id="icon--instructors-null" viewBox="0 0 14 14">
        <path class="icon--instructors-null" fill="#eb8f9a" d="M10.9268293,5.25 C10.9268293,5.51432424 10.8995125,5.81965973 10.844878,6.16601562 C10.7902436,6.51237152 10.6991876,6.8655581 10.5717073,7.22558594 C10.444227,7.58561378 10.2780498,7.93196448 10.0731707,8.26464844 C9.86829166,8.59733239 9.61105846,8.88216027 9.30146341,9.11914062 L9.57463415,9.32421875 L9.19219512,10.0351562 L8.94634146,9.92578125 C8.80975541,9.86197885 8.69593541,9.7685553 8.60487805,9.64550781 C8.51382068,9.52246032 8.45918708,9.38346432 8.44097561,9.22851562 C8.42276414,9.07356693 8.44325174,8.92773506 8.50243902,8.79101562 C8.56162631,8.65429619 8.65040591,8.53580779 8.76878049,8.43554687 C9.23317305,8.07096172 9.56325105,7.55371429 9.75902439,6.88378906 C9.95479773,6.21386384 10.0526829,5.66927293 10.0526829,5.25 L10.0526829,3.0625 C10.0526829,2.82551965 9.96390333,2.57942836 9.78634146,2.32421875 C9.6087796,2.06900914 9.3743104,1.83431097 9.08292683,1.62011719 C8.79154326,1.40592341 8.46374166,1.22819081 8.0995122,1.08691406 C7.73528273,0.945637314 7.36650593,0.875 6.99317073,0.875 C6.62894127,0.875 6.26471727,0.945637314 5.9004878,1.08691406 C5.53625834,1.22819081 5.20845674,1.40820203 4.91707317,1.62695312 C4.6256896,1.84570422 4.388944,2.08268102 4.20682927,2.33789062 C4.02471454,2.59310023 3.93365854,2.83463428 3.93365854,3.0625 L3.93365854,5.25 C3.93365854,5.67838756 4.04292574,6.22525709 4.26146341,6.890625 C4.48000109,7.55599291 4.81690829,8.07096172 5.27219512,8.43554687 C5.3905697,8.52669316 5.4770729,8.64290294 5.53170732,8.78417969 C5.58634174,8.92545644 5.60455294,9.07356693 5.58634146,9.22851562 C5.56812999,9.37434969 5.51349639,9.50878845 5.42243902,9.63183594 C5.33138166,9.75488343 5.21756166,9.84830697 5.08097561,9.91210937 L1.24292683,11.7304687 C1.18829241,11.748698 1.11317121,11.7942705 1.01756098,11.8671875 C0.921950741,11.9401045 0.874146341,12.0631502 0.874146341,12.2363281 L0.874146341,13.125 L9.17853659,13.125 L9.17853659,14 L0.874146341,14 C0.63739719,14 0.43252119,13.9134123 0.259512195,13.7402344 C0.0865032,13.5670564 0,13.3619804 0,13.125 L0,11.8125 C0,11.566405 0.1456896,11.3590503 0.437073171,11.1904297 L0.874146341,10.9375 L4.71219512,9.11914062 C4.41170581,8.87304564 4.15674901,8.57682465 3.94731707,8.23046875 C3.73788513,7.88411285 3.56715513,7.53092628 3.43512195,7.17089844 C3.30308877,6.8108706 3.20747997,6.45996265 3.14829268,6.11816406 C3.0891054,5.77636548 3.0595122,5.48698035 3.0595122,5.25 L3.0595122,3.0625 C3.0595122,2.69791484 3.1733322,2.33333516 3.40097561,1.96875 C3.62861902,1.60416484 3.92910382,1.27604312 4.30243902,0.984375 C4.67577422,0.692706875 5.09690822,0.455730078 5.56585366,0.2734375 C6.03479909,0.0911449219 6.51056669,0 6.99317073,0 C7.47577477,0 7.95154237,0.0911449219 8.4204878,0.2734375 C8.88943324,0.455730078 9.31056724,0.692706875 9.68390244,0.984375 C10.0572376,1.27604312 10.3577224,1.60416484 10.5853659,1.96875 C10.8130093,2.33333516 10.9268293,2.69791484 10.9268293,3.0625 L10.9268293,5.25 Z M12.6478049,12.0175781 L13.8770732,13.2480469 C13.9590248,13.3391932 14,13.4440098 14,13.5625 C14,13.6809902 13.9590248,13.7858068 13.8770732,13.8769531 C13.7951215,13.9589848 13.6926835,14 13.5697561,14 C13.4468287,14 13.3443907,13.9589848 13.262439,13.8769531 L12.0195122,12.6328125 L10.7902439,13.8769531 C10.7082923,13.9589848 10.6058543,14 10.4829268,14 C10.3599994,14 10.2575614,13.9589848 10.1756098,13.8769531 C10.0845524,13.7858068 10.0390244,13.6809902 10.0390244,13.5625 C10.0390244,13.4440098 10.0845524,13.3391932 10.1756098,13.2480469 L11.404878,12.0175781 L10.1756098,10.7734375 C10.0845524,10.6914058 10.0390244,10.5888678 10.0390244,10.4658203 C10.0390244,10.3427728 10.0845524,10.2402348 10.1756098,10.1582031 C10.2575614,10.0761715 10.3599994,10.0351562 10.4829268,10.0351562 C10.6058543,10.0351562 10.7082923,10.0761715 10.7902439,10.1582031 L12.0195122,11.4023437 L13.262439,10.1582031 C13.3443907,10.0761715 13.4468287,10.0351562 13.5697561,10.0351562 C13.6926835,10.0351562 13.7951215,10.0761715 13.8770732,10.1582031 C13.9590248,10.2402348 14,10.3427728 14,10.4658203 C14,10.5888678 13.9590248,10.6914058 13.8770732,10.7734375 L12.6478049,12.0175781 Z"></path>
      </symbol>
      <symbol id="icon--instructors-none" viewBox="0 0 14 14">
        <path class="icon--instructors-none" fill="#9b9b9b" d="M11,5.25 C11,5.51432424 10.9725003,5.81965973 10.9175,6.16601562 C10.8624997,6.51237152 10.770834,6.8655581 10.6425,7.22558594 C10.514166,7.58561378 10.346876,7.93196448 10.140625,8.26464844 C9.93437397,8.59733239 9.67541823,8.88216027 9.36375,9.11914062 L9.63875,9.32421875 L9.25375,10.0351562 L9.00625,9.92578125 C8.86874931,9.86197885 8.75416713,9.7685553 8.6625,9.64550781 C8.57083288,9.52246032 8.51583343,9.38346432 8.4975,9.22851562 C8.47916658,9.07356693 8.49979137,8.92773506 8.559375,8.79101562 C8.61895863,8.65429619 8.70833274,8.53580779 8.8275,8.43554687 C9.29500234,8.07096172 9.62729068,7.55371429 9.824375,6.88378906 C10.0214593,6.21386384 10.12,5.66927293 10.12,5.25 L10.12,3.0625 C10.12,2.82551965 10.0306259,2.57942836 9.851875,2.32421875 C9.67312411,2.06900914 9.4370848,1.83431097 9.14375,1.62011719 C8.8504152,1.40592341 8.5204185,1.22819081 8.15375,1.08691406 C7.7870815,0.945637314 7.41583521,0.875 7.04,0.875 C6.6733315,0.875 6.3066685,0.945637314 5.94,1.08691406 C5.5733315,1.22819081 5.2433348,1.40820203 4.95,1.62695312 C4.6566652,1.84570422 4.41833425,2.08268102 4.235,2.33789062 C4.05166575,2.59310023 3.96,2.83463428 3.96,3.0625 L3.96,5.25 C3.96,5.67838756 4.0699989,6.22525709 4.29,6.890625 C4.5100011,7.55599291 4.84916438,8.07096172 5.3075,8.43554687 C5.42666726,8.52669316 5.51374973,8.64290294 5.56875,8.78417969 C5.62375028,8.92545644 5.64208343,9.07356693 5.62375,9.22851562 C5.60541658,9.37434969 5.55041713,9.50878845 5.45875,9.63183594 C5.36708288,9.75488343 5.25250069,9.84830697 5.115,9.91210937 L1.25125,11.7304687 C1.19624973,11.748698 1.12062548,11.7942705 1.024375,11.8671875 C0.928124519,11.9401045 0.88,12.0631502 0.88,12.2363281 L0.88,13.125 L9.24,13.125 L9.24,14 L0.88,14 C0.641665475,14 0.435417538,13.9134123 0.26125,13.7402344 C0.0870824625,13.5670564 0,13.3619804 0,13.125 L0,11.8125 C0,11.566405 0.1466652,11.3590503 0.44,11.1904297 L0.88,10.9375 L4.74375,9.11914062 C4.44124849,8.87304564 4.18458439,8.57682465 3.97375,8.23046875 C3.76291561,7.88411285 3.59104233,7.53092628 3.458125,7.17089844 C3.32520767,6.8108706 3.22895863,6.45996265 3.169375,6.11816406 C3.10979137,5.77636548 3.08,5.48698035 3.08,5.25 L3.08,3.0625 C3.08,2.69791484 3.19458219,2.33333516 3.42375,1.96875 C3.65291781,1.60416484 3.95541479,1.27604312 4.33125,0.984375 C4.70708521,0.692706875 5.13103931,0.455730078 5.603125,0.2734375 C6.07521069,0.0911449219 6.55416424,0 7.04,0 C7.52583576,0 8.00478931,0.0911449219 8.476875,0.2734375 C8.94896069,0.455730078 9.37291479,0.692706875 9.74875,0.984375 C10.1245852,1.27604312 10.4270822,1.60416484 10.65625,1.96875 C10.8854178,2.33333516 11,2.69791484 11,3.0625 L11,5.25 Z M12.6464844,11.8925781 L13.8769531,13.1230469 C13.9589848,13.2141932 14,13.3190098 14,13.4375 C14,13.5559902 13.9589848,13.6608068 13.8769531,13.7519531 C13.7949215,13.8339848 13.6923834,13.875 13.5693359,13.875 C13.4462884,13.875 13.3437504,13.8339848 13.2617188,13.7519531 L12.0175781,12.5078125 L10.7871094,13.7519531 C10.7050777,13.8339848 10.6025397,13.875 10.4794922,13.875 C10.3564447,13.875 10.2539067,13.8339848 10.171875,13.7519531 C10.0807287,13.6608068 10.0351562,13.5559902 10.0351562,13.4375 C10.0351562,13.3190098 10.0807287,13.2141932 10.171875,13.1230469 L11.4023438,11.8925781 L10.171875,10.6484375 C10.0807287,10.5664058 10.0351562,10.4638678 10.0351562,10.3408203 C10.0351562,10.2177728 10.0807287,10.1152348 10.171875,10.0332031 C10.2539067,9.95117146 10.3564447,9.91015625 10.4794922,9.91015625 C10.6025397,9.91015625 10.7050777,9.95117146 10.7871094,10.0332031 L12.0175781,11.2773437 L13.2617188,10.0332031 C13.3437504,9.95117146 13.4462884,9.91015625 13.5693359,9.91015625 C13.6923834,9.91015625 13.7949215,9.95117146 13.8769531,10.0332031 C13.9589848,10.1152348 14,10.2177728 14,10.3408203 C14,10.4638678 13.9589848,10.5664058 13.8769531,10.6484375 L12.6464844,11.8925781 Z"></path>
      </symbol>
      <symbol id="icon--checkbox--warning" viewBox="0 0 15 15">
        <path class="icon--checkbox--warning" fill="#f8e71c" d="M7.49999539,10 C8.04753309,10 8.49140009,10.443867 8.49140009,10.9914047 L8.49140009,11.0085953 C8.49140009,11.556133 8.04753309,12 7.49999539,12 C6.9524577,12 6.5085907,11.556133 6.5085907,11.0085953 L6.5085907,10.9914047 C6.5085907,10.443867 6.9524577,10 7.49999539,10 Z M7.50002903,3 C8.05232065,3 8.5000359,3.44771525 8.5000359,4 C8.5000359,4.03035027 8.49865419,4.06068481 8.49589507,4.0909094 L8.09755021,8.45454359 C8.06934677,8.76349571 7.81026923,9 7.50003247,9 C7.18979571,9 6.93071816,8.76349571 6.90251472,8.45454359 L6.50416987,4.0909094 C6.45396199,3.54091157 6.8591218,3.05434871 7.40911963,3.00414083 C7.43934423,3.00138171 7.46967876,3 7.50002903,3 Z M7.5,13 C10.5375661,13 13,10.5375661 13,7.5 C13,4.46243388 10.5375661,2 7.5,2 C4.46243388,2 2,4.46243388 2,7.5 C2,10.5375661 4.46243388,13 7.5,13 Z M7.5,14 C3.91014913,14 1,11.0898509 1,7.5 C1,3.91014913 3.91014913,1 7.5,1 C11.0898509,1 14,3.91014913 14,7.5 C14,11.0898509 11.0898509,14 7.5,14 Z"></path>
      </symbol>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <symbol id="icon--checkbox--checked" viewBox="0 0 15 15">
        <path class="icon--checkbox--checked" fill="#b8e986" d="M10.0668733,4.73047335 C10.3947209,4.42317555 10.9262668,4.42317555 11.2541143,4.73047335 C11.5819619,5.03777116 11.5819619,5.53599934 11.2541143,5.84329714 L6.53189211,10.2695266 C6.20404456,10.5768245 5.67249865,10.5768245 5.3446511,10.2695266 L3.24588567,8.30231353 C2.91803811,7.99501573 2.91803811,7.49678755 3.24588567,7.18948975 C3.57373322,6.88219194 4.10527913,6.88219194 4.43312668,7.18948975 L5.9382716,8.60029097 L10.0668733,4.73047335 Z"></path>
      </symbol>
      <symbol id="icon--checkbox--available" viewBox="0 0 15 15">
        <path class="icon--checkbox--available" fill="#96b3cb" d="M7.5,12 C9.98528137,12 12,9.98528137 12,7.5 C12,5.01471863 9.98528137,3 7.5,3 C5.01471863,3 3,5.01471863 3,7.5 C3,9.98528137 5.01471863,12 7.5,12 Z M7.5,13.5 C4.1862915,13.5 1.5,10.8137085 1.5,7.5 C1.5,4.1862915 4.1862915,1.5 7.5,1.5 C10.8137085,1.5 13.5,4.1862915 13.5,7.5 C13.5,10.8137085 10.8137085,13.5 7.5,13.5 Z"></path>
      </symbol>
      <symbol id="icon--checkbox--checked--solid" viewBox="0 0 15 15">
        <path class="icon--checkbox--checked--solid" fill="#f5a623"  d="M10.0668733,4.73047335 C10.3947209,4.42317555 10.9262668,4.42317555 11.2541143,4.73047335 C11.5819619,5.03777116 11.5819619,5.53599934 11.2541143,5.84329714 L6.53189211,10.2695266 C6.20404456,10.5768245 5.67249865,10.5768245 5.3446511,10.2695266 L3.24588567,8.30231353 C2.91803811,7.99501573 2.91803811,7.49678755 3.24588567,7.18948975 C3.57373322,6.88219194 4.10527913,6.88219194 4.43312668,7.18948975 L5.9382716,8.60029097 L10.0668733,4.73047335 Z M14,7.5 C14,11.0885417 11.0885417,14 7.5,14 C3.91145833,14 1,11.0885417 1,7.5 C1,3.91145833 3.91145833,1 7.5,1 C11.0885417,1 14,3.91145833 14,7.5 Z"></path>
      </symbol>
      <symbol id="icon--checkbox--unchecked" viewBox="0 0 15 15">
        <circle class="icon--checkbox--unchecked" stroke="#9b9b9b" fill="none" cx="7.5" cy="7.5" r="6"></circle>
      </symbol>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <symbol id="icon--control--add" viewBox="0 0 15 15">
        <path class="icon--control--add" fill="#b8e986" d="M7.5,1 C11.0898509,1 14,3.91014913 14,7.5 C14,11.0898509 11.0898509,14 7.5,14 C3.91014913,14 1,11.0898509 1,7.5 C1,3.91014913 3.91014913,1 7.5,1 Z M8.14285714,6.85714286 L8.14285714,3.64285714 C8.14285714,3.28781695 7.8550402,3 7.5,3 C7.1449598,3 6.85714286,3.28781695 6.85714286,3.64285714 L6.85714286,6.85714286 L3.64285714,6.85714286 C3.28781695,6.85714286 3,7.1449598 3,7.5 C3,7.8550402 3.28781695,8.14285714 3.64285714,8.14285714 L6.85714286,8.14285714 L6.85714286,11.3571429 C6.85714286,11.7121831 7.1449598,12 7.5,12 C7.8550402,12 8.14285714,11.7121831 8.14285714,11.3571429 L8.14285714,8.14285714 L11.3571429,8.14285714 C11.7121831,8.14285714 12,7.8550402 12,7.5 C12,7.1449598 11.7121831,6.85714286 11.3571429,6.85714286 L8.14285714,6.85714286 Z"></path>
      </symbol>
      <symbol id="icon--control--x" viewBox="0 0 15 15">
        <path class="icon--control--x" fill="#eeeeee" d="M8.57900857,7.5 L11.27653,10.1975214 C11.57449,10.4954814 11.57449,10.97857 11.27653,11.27653 C10.97857,11.57449 10.4954814,11.57449 10.1975214,11.27653 L7.5,8.57900857 L4.80247857,11.27653 C4.50451858,11.57449 4.02142998,11.57449 3.72346999,11.27653 C3.42551,10.97857 3.42551,10.4954814 3.72346999,10.1975214 L6.42099143,7.5 L3.72346999,4.80247857 C3.42551,4.50451858 3.42551,4.02142998 3.72346999,3.72346999 C4.02142998,3.42551 4.50451858,3.42551 4.80247857,3.72346999 L7.5,6.42099143 L10.1975214,3.72346999 C10.4954814,3.42551 10.97857,3.42551 11.27653,3.72346999 C11.57449,4.02142998 11.57449,4.50451858 11.27653,4.80247857 L8.57900857,7.5 Z"></path>
      </symbol>
      <symbol id="icon--control--minus" viewBox="0 0 15 15">
        <path class="icon--control--minus" fill="#eeeeee" d="M3.75,6.75 L11.25,6.75 C11.6642136,6.75 12,7.08578644 12,7.5 C12,7.91421356 11.6642136,8.25 11.25,8.25 L3.75,8.25 C3.33578644,8.25 3,7.91421356 3,7.5 C3,7.08578644 3.33578644,6.75 3.75,6.75 Z"></path>
      </symbol>
      <symbol id="icon--control--expand" viewBox="0 0 15 15">
        <path class="icon--control--expand" fill="#777777" d="M2.5,6 C1.67157288,6 1,6.67157288 1,7.5 C1,8.32842712 1.67157288,9 2.5,9 L12.5,9 C13.3284271,9 14,8.32842712 14,7.5 C14,6.67157288 13.3284271,6 12.5,6 L2.5,6 Z M2.5,5 L12.5,5 C13.8807119,5 15,6.11928813 15,7.5 C15,8.88071187 13.8807119,10 12.5,10 L2.5,10 C1.11928813,10 1.69088438e-16,8.88071187 0,7.5 C-1.69088438e-16,6.11928813 1.11928813,5 2.5,5 Z M7.5,1 L10,4 L5,4 L7.5,1 Z M7.5,14 L5,11 L10,11 L7.5,14 Z" fill-rule="nonzero"></path>
      </symbol>
      <symbol id="icon--control--contract" viewBox="0 0 15 15">
        <path class="icon--control--contract" fill="#777777" d="M3,1 C1.8954305,1 1,1.8954305 1,3 L1,12 C1,13.1045695 1.8954305,14 3,14 L12,14 C13.1045695,14 14,13.1045695 14,12 L14,3 C14,1.8954305 13.1045695,1 12,1 L3,1 Z M3,0 L12,0 C13.6568542,-3.04359188e-16 15,1.34314575 15,3 L15,12 C15,13.6568542 13.6568542,15 12,15 L3,15 C1.34314575,15 2.02906125e-16,13.6568542 0,12 L0,3 C-2.02906125e-16,1.34314575 1.34314575,3.04359188e-16 3,0 Z M7.5,10 L5,13 L10,13 L7.5,10 Z M7.5,5 L10,2 L5,2 L7.5,5 Z" fill-rule="nonzero"></path>
      </symbol>
    </svg>

    <div class="sim-calendar--header">
      <div class="sim-calendar--header--controls sim-calendar--header--controls--months">
        <span @click="loadPreviousMonth">
          <SimIconText icon="fa-arrow-left fa-fw"></SimIconText>
        </span>
        <span @click="setTheActiveDateToToday">
          {{ displayDate }}
        </span>
        <span @click="loadNextMonth">
          <SimIconText icon="fa-arrow-right fa-fw"></SimIconText>
        </span>
      </div>
      <div class="sim-calendar--header--mode" v-if="canScheduleEvents">
        <SimSwitch v-model="contextSwitch" left-label="My Availability" right-label="Schedule Events"/>
      </div>
      <div class="sim-calendar--header--controls sim-calendar--header--controls--days">
        <span @click="loadPrevDay">
          <SimIconText icon="fa-arrow-left fa-fw"></SimIconText>
        </span>
        <span @click="setTheActiveDateToToday">
          today
        </span>
        <span @click="loadNextDay">
          <SimIconText icon="fa-arrow-right fa-fw"></SimIconText>
        </span>
      </div>
    </div>

    <div class="sim-calendar--body">

      <main class="sim-calendar--main">
        <div class="sim-calendar--grid">
          <div class="sim-calendar--grid--header">
            <div v-for="dayName in $store.state.calendar.settings.day_names" class="sim-calendar--grid--header--day">
              <span class="sim-calendar--grid--header--dayname">
                {{ dayName }}
              </span>
            </div>
          </div>
          <div class="sim-calendar--grid--body">
            <div class="sim-calendar--grid--days" @click.meta="toggleExpandedWeek">

              <div v-if="startOffset > 0" class="sim-calendar--grid--before" :style="{'--offset': startOffset}"></div>

              <CalendarDay v-for="day in monthDays"
                           class="sim-calendar--grid--day"
                           @blocksWereUpdated="saveUpdatedBlocksFromACalendarDay"
                           @toggle-expanded-week="toggleExpandedWeek"
                           :key="day.date"
                           :date="day.date"
                           :is-in-active-week="day.isInActiveWeek"
                           :show-expanded-week="showExpandedWeek"
                           :show-historical-data="showHistoricalData"
                           :user-context="contextLabel"
                           :initialEventLength="filterEventLength"
                           :has-only-specific-instructors="thereAreOnlySpecificInstructors"
                           :initialEventBlocks="day.eventBlocks"
                           :initialPendingEventBlocks="day.pendingEventBlocks"
                           :initialCurrentUserAvailabilityBlocks="day.currentUserAvailabilityBlocks"
                           :initialAggregateUserAvailabilityBlocks="day.aggregateUserAvailabilityBlocks"
                           :initialAllBlocks="day.allBlocks"
                />

              <div v-if="endOffset > 0" class="sim-calendar--grid--after"></div>

            </div>

            <SimBubble v-if="bubbleIsOpen">
              <SimSlidePresenter :should-hide-navigation-controls="hideSlideNavigationControls"></SimSlidePresenter>
            </SimBubble>

            <div class="sim-loader--shield" v-if="isLoading">
              <SimLoader :is-loading="true"></SimLoader>
            </div>
          </div>
        </div>
      </main>

      <aside class="sim-calendar--aside" :class="filterContainerClasses">
        <template v-if="isCoordinatorContext">
          <div class="sim-calendar--aside--header">
            <span><b>Filters</b></span>
          </div>
          <div class="sim-calendar--aside--body" @click="closeBubble">
            <section class="sim-flex--1 sim-flex--column filter-molecule filter--duration">
              <header class="filter-molecule--heading text--orange--lighter"><SimIconText icon="#icon--event-duration" icon-type="svg" text="Duration"></SimIconText></header>
              <div class="filter-molecule--options sim-flex--handoff">
                <SimTimePicker orientation="y"
                              timeline-mode="numbers"
                              block-theme="duration"
                              :show-block-time="false"
                              :time-block-limit="1"
                              :time-block-default-duration="1"
                              :start-time="0"
                              :end-time="6"
                              :block-settings="durationFilterBlockSettings"
                              :duration-filter-blocks="durationFilterBlocks"
                              :date="date"
                              />
              </div>
            </section>

            <div class="sim-flex--2">
              <section class="filter-molecule filter--instructors sim-filter">
                <header class="filter-molecule--heading text--green">
                  <SimIconText icon="#icon--instructors-checked" icon-type="svg" :text="`Instructors: ${activeInstructorCount}`"></SimIconText>
                </header>
                <div class="filter-molecule--options">
                  <SimDatalist :items="activeInstructors" :animate="true">
                    <li slot="item" slot-scope="props" :key="props.item.seat" :class="`instructor-${props.item.id}`">
                      <SimAutofinder placeholder="Any Available Instructor"
                                     :tabIndex="props.index"
                                     :item="props.item"
                                     :index="props.index"
                                     :is-alone="(activeInstructorCount === 1)"
                                     :options="inactiveInstructors"
                                     @select="addItemToActiveInstructorsList"
                                     @clear="clearItemFromActiveInstructorsList"
                                     @remove="removeFromActiveInstructorsList"
                                     @add-another="addSlotToActiveInstructorsList"
                                     >
                        <template slot="option" slot-scope="props">
                          {{ props.option.lastname }}, {{ props.option.firstname }}
                        </template>
                      </SimAutofinder>
                    </li>
                    <li slot="static-after" key="after">
                      <span class="control--add-item" @click="addSlotToActiveInstructorsList">
                        <SimIconText icon="#icon--control--add" icon-type="svg"></SimIconText>
                      </span>
                    </li>
                  </SimDatalist>
                </div>
              </section>
              <section class="filter-molecule filter--categories">
                <header class="filter-molecule--heading text--blue--lighter"><SimIconText icon="#icon--instructors-exist" icon-type="svg" text="Filters"></SimIconText></header>
                <div class="filter-molecule--options">
                  <SimFilterBy xv-if="userTypeIsClient" system-echo="(Filter is not available yet)" label="Facilities" type="institution_id" :list="institutions" @filter="applyFilter"></SimFilterBy>
                  <SimFilterBy system-echo="(Filter is not available yet)" label="Departments" type="department_id" :list="departments" @filter="applyFilter"></SimFilterBy>
                  <SimFilterBy system-echo="(Filter is not available yet)" label="Professional Titles" type="title_id" :list="professionalTitles" @filter="applyFilter"></SimFilterBy>
                </div>
              </section>
            </div>
          </div>
        </template>

        <template v-if="isInstructorContext">
          <div class="sim-calendar--aside--header">
            <b>My Availability</b>
          </div>
          <div class="sim-calendar--aside--body">
            <SimTimePicker orientation="y"
                          timeline-action="mousedown"
                          :blocks="currentUserAvailabilityBlocksForCurrentDate"
                          :date="date"
                          :should-show-date="true"
                          :initialEventBlocks="currentDay.eventBlocks"
                          :initialPendingEventBlocks="currentDay.pendingEventBlocks"
                          :initial-current-user-availability-blocks="currentDay.currentUserAvailabilityBlocks"
                          :initialAggregateUserAvailabilityBlocks="currentDay.aggregateUserAvailabilityBlocks"
                          @blocksWereUpdated="saveUpdatedBlocksFromACalendarDay"
                          />
          </div>
        </template>
      </aside>

    </div>

  </div>
</template>

<script>
  import moment from 'moment'
  import _ from 'lodash'

  import { lodestar } from '../utilities/animations'

  import availabilities from '../external/availabilities'
  import currentUser from '../external/currentUser'
  import events from '../external/events'
  import eventEditorSlides from '../external/eventEditorSlides'
  import users from '../external/users'

  import CalendarDay from './CalendarDay'
  import SimAutocomplete from './Autocomplete'
  import SimAutofinder from './Autofinder'
  import SimBubble from './Bubble'
  import SimDatalist from './Datalist'
  import SimIconText from './IconText'
  import SimFilterBy from './FilterBy'
  import SimLoader from './Loader'
  import SimSelection from './Selection'
  import SimSlidePresenter from './SlidePresenter'
  import SimSwitch from './Switch'
  import SimTimePicker from './TimePicker'

  export default {
    name: 'sim-calendar',
    components: {
      CalendarDay,
      SimAutocomplete,
      SimAutofinder,
      SimBubble,
      SimDatalist,
      SimIconText,
      SimFilterBy,
      SimLoader,
      SimSelection,
      SimSlidePresenter,
      SimSwitch,
      SimTimePicker,
    },
    props: {
      canScheduleEvents: {
        type: Boolean,
        default: false,
        required: true,
      },
    },
    data() {
      return {
        lastUpdated: Date.now(), // TODO: Not this. - Chad
        rawUserData: {},
        contextSwitch: false,
        calendarIsUpdating: false,
        isLoading: false,
        hideSlideNavigationControls: false,
        showExpandedWeek: this.$store.state.calendar.expand_week,
        showHistoricalData: true,
        date: this.$store.state.activeDate.date,
        institutions: [],
        departments: [],
        professionalTitles: [],
        instructors: [],
        currentSeat: 1,
        activeInstructors: [],
        activeInstructorIds: [],
        inactiveInstructors: [],
        eventBlocks: [],
        pendingEventBlocks: [],
        currentUserAvailabilityBlocks: [],
        durationFilterBlocks: [
          {
            start: 0,
            duration: 1,
          },
        ],
        durationFilterBlockSettings: {
          showBlockHours: true,
          showBlockTime: false,
          canRemoveBlock: false,
          canResizeBlockStart: false,
          canResizeBlockEnd: true,
          canMoveBlock: false,
        },
        aggregateUserAvailabilityBlocks: [],
        allBlocks: [],
        monthDays: {},
      }
    },
    created() {
      this.$store.commit('setSlideTemplates', eventEditorSlides)
      this.$store.commit('setAllUsers', users.users())
      this.$store.commit('setAggregateEventBlocks', events.events())

      this.$store.commit('setCurrentUser', currentUser.user())
      this.$store.commit('setInstitutions', currentUser.institutions())
      this.$store.commit('setDepartments', currentUser.departments())
      this.$store.commit('setProfessionalTitles', currentUser.professionalTitles())
      this.$store.commit('setInstructors', users.users())

      const instructorsPromise = users.getUsers(
        this.$store.state.base_url,
        this.$store.state.currentUser.id,
      )
      instructorsPromise.then((response) => {
        this.$store.commit('setInstructors', Object.values(response.data.users))
      })

      this.fetchInstructorAvailabilitySegments(this.activeMoment)
      this.fetchCurrentUserAvailabilities(this.activeMoment)

      this.eventBlocks                      = this.$store.state.events.blocks
      this.pendingEventBlocks               = this.$store.state.events.pendingBlocks
      this.currentUserAvailabilityBlocks    = this.$store.state.user.availabilities
      this.aggregateUserAvailabilityBlocks  = this.$store.state.availabilities.filteredBlocks
      this.allBlocks                        = this.$store.state.availabilities.allInstructorAvailabilityBlocks

      // TODO: activate these when we need to build them out - Jase
      // this.institutions = this.$store.state.user.institutions || []
      // this.departments = this.$store.state.user.departments || []
      // this.professionalTitles = this.$store.state.user.professionalTitles || []

      this.instructors = this.$store.state.user.instructors
    },
    mounted() {
      this.setTheActiveDateToToday()
      this.resetInactiveInstructors()
      this.addSlotToActiveInstructorsList()

      this.dateFormat = this.$store.state.calendar.settings.date_format.raw

      // When the week/month is updated, refresh this day's currentUserAvailabilityBlocks.
      this.$store.watch(this.$store.getters.getActiveDate, () => {
        this.date = this.$store.state.activeDate.date
      })

      this.$store.watch(this.$store.getters.getInstructorsLastUpdated, () => {
        this.instructors = this.$store.state.user.instructors
        this.resetInactiveInstructors()
      })

      // When a time block is added, updated, or deleted, check to see if it belongs to this date.
      // If so, refresh this day's time blocks.
      this.$store.watch(this.$store.getters.getLastUpdatedCurrentUserAvailabilityBlocks, (date) => {
        this.currentUserAvailabilityBlocks = this.$store.state.user.availabilities

        if (date === this.date) {
          this.$set(
            this.currentUserAvailabilityBlocks,
            [date],
            this.$store.state.user.availabilities[date],
          )

          this.$set(this.monthDays[date], 'currentUserAvailabilityBlocks', this.currentUserAvailabilityBlocks[date])
        }
      })

      this.$store.watch(this.$store.getters.getLastUpdatedPendingEventBlocks, (date) => {
        if (date === this.date) {
          this.$set(
            this.pendingEventBlocks,
            [date],
            this.$store.state.events.pendingBlocks[date],
          )

          this.$set(this.monthDays[date], 'pendingEventBlocks', this.pendingEventBlocks[date])
        }
      })

      this.$store.watch(this.$store.getters.getLastUpdatedAggregateAvailabilityBlocks, () => {
        this.$set(this, 'aggregateUserAvailabilityBlocks', this.$store.state.availabilities.filteredBlocks)
        this.$set(this, 'allBlocks', this.$store.state.availabilities.allInstructorAvailabilityBlocks)

        this.$forceUpdate()
      })
    },
    computed: {
      currentDay() {
        const defaultCurrentDay = {
          eventBlocks: [],
          pendingEventBlocks: [],
          currentUserAvailabilityBlocks: [],
          aggregateUserAvailabilityBlocks: [],
          allBlocks: [],
        }

        let currentDay = this.monthDays[this.date]

        if (currentDay === undefined) {
          currentDay = defaultCurrentDay
        }

        return currentDay
      },
      componentClasses() {
        const classes = [`is-${this.contextLabel}-context`]

        if (this.isCurrentMonth) {
          classes.push('is-current-month')
        }

        if (this.showExpandedWeek || this.bubbleIsOpen) {
          classes.push('is-expanded')
        }

        return classes.join(' ')
      },
      filterContainerClasses() {
        const classes = []

        if (this.isCoordinatorContext) {
          classes.push('sim-calendar--filters')

          if (this.bubbleIsOpen) {
            classes.push('sim-calendar--filters--disabled')
          }
        } else if (this.isInstructorContext) {
          classes.push('sim-calendar--day-control-panel')
        }

        return classes.join(' ')
      },
      activeMoment() {
        return moment(this.$store.state.activeDate.date)
      },
      activeMonth() {
        return this.activeMoment.month()
      },
      activeYear() {
        return this.activeMoment.year()
      },
      isCurrentMonth() {
        return moment()
          .isSame([this.activeYear, this.activeMonth, 1], 'month')
      },
      startOffset() {
        return moment([this.activeYear, this.activeMonth, 1]).day()
      },
      endOffset() {
        return 6 - moment([this.activeYear, this.activeMonth, this.currentMonthDays.length]).day()
      },
      currentMonthDays() {
        const startOfWeek = moment(this.activeMoment).startOf('week')
        const startOfMonth = moment(this.activeMoment).startOf('month')

        const weekLimit = 7
        const monthLimit = this.activeMoment.daysInMonth()

        const activeMonthDays = this.setDays(startOfMonth, monthLimit)
        const activeWeekDays = this.setDays(startOfWeek, weekLimit)

        this.monthDays = {}

        _.each(activeMonthDays, (day) => {
          this.monthDays[day] = {
            date: day,
            isInActiveWeek: activeWeekDays.includes(day),
            currentUserAvailabilityBlocks: this.currentUserAvailabilityBlocks[day] || [],
            aggregateUserAvailabilityBlocks: this.aggregateUserAvailabilityBlocks[day] || [],
            allBlocks: this.allBlocks[day] || [],
            eventBlocks: this.eventBlocks[day] || [],
            pendingEventBlocks: this.pendingEventBlocks[day] || [],
          }
        })

        return activeMonthDays
      },
      displayMonthName() {
        return this.activeMoment.format(this.$store.state.calendar.settings.date_format.month_name)
      },
      displayYear() {
        return this.activeMoment.format(this.$store.state.calendar.settings.date_format.year)
      },
      displayDate() {
        return `${this.displayMonthName} ${this.displayYear}`
      },
      isInstructorContext() {
        return (this.contextSwitch === false)
      },
      isCoordinatorContext() {
        return (this.contextSwitch === true)
      },
      contextLabel() {
        return this.isInstructorContext ? 'instructor' : 'coordinator'
      },
      bubbleIsOpen() {
        return this.$store.state.bubble.is_open
      },
      currentUserAvailabilityBlocksForCurrentDate() {
        return this.currentUserAvailabilityBlocks[this.date]
      },
      filterEventLength() {
        // TODO: Update Vuex available instructors here. - Chad
        return this.durationFilterBlocks[0].duration
      },
      activeInstructorCount() {
        return this.activeInstructors.length
      },
      specificInstructorIds() {
        return this.activeInstructorIds.filter((id) => id !== undefined)
      },
      specificInstructorCount() {
        return this.specificInstructorIds.length
      },
      thereAreOnlySpecificInstructors() {
        return (this.specificInstructorCount === this.activeInstructorCount)
      },
    },
    watch: {
      activeMoment(newDate, oldDate) {
        if (!moment(newDate).isSame(oldDate, 'month')) {
          if (this.isCoordinatorContext) {
            this.fetchInstructorAvailabilitySegments(newDate)
          } else {
            this.fetchCurrentUserAvailabilities(newDate)
          }
        }
      },
      aggregateUserAvailabilityBlocks() {
        const startOfWeek = moment(this.activeMoment).startOf('week')
        const startOfMonth = moment(this.activeMoment).startOf('month')

        const weekLimit = 7
        const monthLimit = this.activeMoment.daysInMonth()

        const activeWeekDays = this.setDays(startOfWeek, weekLimit)
        const activeMonthDays = this.setDays(startOfMonth, monthLimit)

        this.monthDays = {}

        _.each(activeMonthDays, (monthDay) => {
          this.$set(this.monthDays, [monthDay], {
            date: monthDay,
            isInActiveWeek: activeWeekDays.includes(monthDay),
            currentUserAvailabilityBlocks: this.currentUserAvailabilityBlocks[monthDay] || [],
            aggregateUserAvailabilityBlocks: this.$store.state.availabilities.filteredBlocks[monthDay] || {},
            allBlocks: this.$store.state.availabilities.allInstructorAvailabilityBlocks[monthDay] || {},
            eventBlocks: this.eventBlocks[monthDay] || [],
            pendingEventBlocks: this.pendingEventBlocks[monthDay] || [],
          })
        })
      },
      contextSwitch() {
        const date = moment(this.activeMoment).format(this.dateFormat)
        this.$store.commit('setActiveDate', date)
        if (this.isCoordinatorContext) {
          this.fetchInstructorAvailabilitySegments(date)
        } else {
          this.fetchCurrentUserAvailabilities(date)
        }
        this.closeBubble()
      },
      calendarIsUpdating(value) {
        this.isLoading = value
      },
      activeInstructors() {
        this.activeInstructorIds = _.map(this.activeInstructors, (instructor) => instructor.id)

        this.lastUpdated = Date.now()

        this.$store.dispatch(
          'filterInstructorAvailabilityBlocks', {
            eventLength: this.filterEventLength,
            date: this.lastUpdated,
            specificInstructorIds: this.activeInstructorIds,
            nonspecificInstructorIds: _.map(this.activeInstructors, (instructor) => instructor.id),
          })

        return this.activeInstructors
      },
      filterEventLength() {
        this.lastUpdated = Date.now()

        this.$store.dispatch(
          'filterInstructorAvailabilityBlocks', {
            eventLength: this.filterEventLength,
            date: this.lastUpdated,
            specificInstructorIds: this.activeInstructorIds,
            nonspecificInstructorIds: _.map(this.activeInstructors, (instructor) => instructor.id),
          })
      },
    },
    methods: {
      fetchInstructorAvailabilitySegments(date) {
        const firstDayOfTheMonth = moment(date).startOf('month').format('YYYY-MM-DD 00:00:00')
        const lastDayOfTheMonth = moment(date).endOf('month').format('YYYY-MM-DD 23:59:59')

        this.$store.dispatch(
          'getInstructorAvailabilitySegments',
          {
            baseUrl: this.$store.state.base_url,
            userId: this.$store.state.currentUser.id,
            startDate: firstDayOfTheMonth,
            endDate: lastDayOfTheMonth,
            mock: this.$store.state.mock,
          },
        )
      },
      fetchCurrentUserAvailabilities(date) {
        const firstDayOfTheMonth = moment(date).startOf('month').format('YYYY-MM-DD 00:00:00')
        const lastDayOfTheMonth = moment(date).endOf('month').format('YYYY-MM-DD 23:59:59')

        const userAvailabilitiesPromise = currentUser.availabilities(
          this.$store.state.base_url,
          this.$store.state.currentUser.id,
          firstDayOfTheMonth,
          lastDayOfTheMonth,
        )
        userAvailabilitiesPromise.then((response) => {
          this.$store.commit('setCurrentUserAvailabilities', { blocks: response.data.dates, date: this.date })
        })
      },
      toggleExpandedWeek() {
        this.showExpandedWeek = !this.showExpandedWeek
        this.$store.commit('setCalendarExpandWeek', this.showExpandedWeek)
      },
      addSlotToActiveInstructorsList() {
        this.activeInstructors.push(
          {
            seat: this.currentSeat,
            firstname: '',
            lastname: '',
          })

        this.currentSeat++
      },
      addItemToActiveInstructorsList(item, index) {
        this.activeInstructors.splice(index, 1, item)
        this.removeFromInactiveInstructorsList(item)
      },
      clearItemFromActiveInstructorsList(item) {
        if (this.activeInstructors.includes(item)) {
          this.activeInstructors.splice(this.activeInstructors.indexOf(item), 1, {
            seat: item.seat,
            firstname: '',
            lastname: '',
          })
          this.restoreItemToInactiveInstructorsList(item)
        }
      },
      removeFromActiveInstructorsList(item) {
        this.activeInstructors = this.activeInstructors.filter((element) => element.seat !== item.seat)
        if (item.id) {
          this.restoreItemToInactiveInstructorsList(item)
        }
      },
      removeFromInactiveInstructorsList(item) {
        this.inactiveInstructors = this.inactiveInstructors.filter((element) => element.id !== item.id)
      },
      restoreItemToInactiveInstructorsList(item) {
        if (item.seat) {
          delete item.seat
        }

        if (!this.inactiveInstructors.includes(item)) {
          this.inactiveInstructors.push(item)
          _.sortBy(this.inactiveInstructors, ['lastname', 'firstname'])
        }
      },
      resetInactiveInstructors() {
        this.inactiveInstructors = JSON.parse(JSON.stringify(this.instructors)) // cheap cologne :) - Jase
        _.sortBy(this.inactiveInstructors, ['lastname', 'firstname'])
      },
      closeBubble() {
        this.$store.commit('toggleBubbleVisibility', false)
      },
      setDays(start, limit) {
        const dateStrings = [start.format(this.dateFormat)]

        for (let i = 1; i < limit; i++) {
          dateStrings.push(start.add(1, 'day').format(this.dateFormat))
        }

        return dateStrings
      },
      loadNextMonth() {
        const date = moment(this.activeMoment).add(1, 'month').format(this.dateFormat)
        this.closeBubble()
        this.$store.commit('setActiveDate', date)
      },
      loadPreviousMonth() {
        const date = moment(this.activeMoment).subtract(1, 'month').format(this.dateFormat)
        this.closeBubble()
        this.$store.commit('setActiveDate', date)
      },
      loadNextDay() {
        const date = moment(this.activeMoment).add(1, 'day').format(this.dateFormat)
        this.closeBubble()
        this.$store.commit('setActiveDate', date)
      },
      loadPrevDay() {
        const date = moment(this.activeMoment).subtract(1, 'day').format(this.dateFormat)
        this.closeBubble()
        this.$store.commit('setActiveDate', date)
      },
      setTheActiveDateToToday() {
        const date = moment().format(this.dateFormat)
        this.closeBubble()
        this.$store.commit('setActiveDate', date)
      },
      applyFilter(type, data) {
          this.filters.find((filter) => filter.type === type).items = data
          this.filteredUsers = this.users.filter((item) => {
            // @FIXME ew this.filters[n]...
            // return this.filters.forEach(filter => filter.items.length ? filter.items.includes(item[filter.type]) : true)

            // legend:  filters[0] = institutions
            //          filters[1] = departments
            //          filters[2] = professionalTitles
            return (this.userTypeIsClient && this.filters[0].items.length ? this.filters[0].items.includes(item[this.filters[0].type]) : true)
                && (this.filters[1].items.length ? this.filters[1].items.includes(item[this.filters[1].type]) : true)
                && (this.filters[2].items.length ? this.filters[2].items.includes(item[this.filters[2].type]) : true)
          })
          // this.bulkCheckState = this.isSetSelectedAlready(this.filteredUsers)
      },
      saveUpdatedBlocksFromACalendarDay(blocksToUpdate) {
        // TODO: Normalize this for setting any type of block. - Chad
        this.$store.commit('setUserAvailabilityBlocksForDay', blocksToUpdate)

        currentUser.saveAvailabilities(
          this.$store.state.base_url,
          this.$store.state.currentUser.id,
          blocksToUpdate,
        )
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/calendar';

  .sim-flex--handoff {flex: 1;display: flex;}
  .sim-flex--1 {flex: 1;}
  .sim-flex--2 {flex: 2;}
  .sim-flex--3 {flex: 3;}
  .sim-flex--4 {flex: 4;}
  .sim-flex--5 {flex: 5;}
  .sim-flex--row {display: flex;flex-direction: row;}
  .sim-flex--row--between {display: flex;flex-direction: row;justify-content: space-between;}
  .sim-flex--row--between--center {display: flex;flex-direction: row;justify-content: space-between;align-items: center;}
  .sim-flex--row--between--baseline {display: flex;flex-direction: row;justify-content: space-between;align-items: baseline;}
  .sim-flex--column {display: flex;flex-direction: column;}

  .control--add-item {
    cursor: pointer;
    transition: transform var(--ms, var(--default-ms, 350ms)) ease-out;

    &:hover {
      transform: scale(1.1);
    }
    &:active:not(:disabled) {
      transform: scale(.9);
    }
  }

  .sim-calendar .sim-bubble {
    top: -1em;
    bottom: -1em;
    width: calc(var(--width-factor, 1) * 25em);
    max-width: 50%;
    &::before,
    &::after {
      top: calc(var(--dink-y) * 1px);
    }
    &--left {
      left: calc(14.285% * var(--x) - .2em);
    }
    &--right {
      left: calc(14.285% * (var(--x) - 1) + .2em);
      transform: translateX(-100%);
    }
  }

  .sim-calendar {
    --switch-color: var(--lighter-grey);
    --switch-color-active: var(--lighter-grey);
    --switch-handle-color: var(--action);
    --timeblock-color: var(--green);
    --bubble-fg: var(--lighter);
    --bubble-bg: var(--dark-grey); //#fcf9e9; //var(--lightest);
    --slide-fg: var(--bubble-fg);
    --slide-bg: var(--bubble-bg);

    .sim-switch input {
      box-shadow: 0 0 0 1px var(--light-grey);
      &::before {
        padding: 1ch;
        color: var(--lightest);
      }
    }

    &.is-instructor-context {
      .sim-calendar--aside {
        width: 20em;
      }

      .sim-calendar--grid--day--timelines {
        cursor: cell;
        left: 50%;
      }
    }

    &.is-coordinator-context {
      .sim-calendar--aside {
        width: 28em;
      }
      .sim-calendar--grid--day--timelines {
        left: 3em;
      }
    }

    .local--day--pending-blocks {
      position: absolute;
      top: 0;
      left: 15%;
      right: 15%;
      bottom: 0;
    }
  }

  .filter-molecule {
    .sim-timepicker--y {
      padding: 1em .5em 1em 1em;
      .sim-timepicker--inner {
        width: auto;
      }

      .sim-timeblock .sim-timeblock--info {
        left: 50%;
        transform: translate(-50%, -50%);
        white-space: normal;
        text-align: center;
      }
    }

    &.filter--duration {
      background: var(--shade);
      margin: -1em 1em -1em -1em;
      padding: 1em;
    }

    &.filter--instructors {
      &--seat {
        display: flex;
      }
    }
  }
</style>
