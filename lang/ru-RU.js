export default async (context, locale) => {
  return await Promise.resolve({
    about: {
      title: "Найдите себе интересного собеседника",
      description: `HeyMaty - это сервис где вы сможете платить за опыт и общение с другими людьми. Блогеры, музыканты, медийные личности и просто 
      профессионалы своего дела всегда доступны для общения.`,
      buttonText: "Найти собеседника!",
    },
    header: {
      models: "Собеседники",
      about: "О сервисе",
      register: "Регистрация",
      login: "Войти",
      settings: "Настройки",
      myprofile: "Мой Профиль",
      logout: "Выход",
    },
    signInForm: {
      title: "Вход",
      emailPlaceholder: "E-mail",
      passwordPlaceholder: "Пароль",
      remeberMe: "Оставаться в системе",
      forgotPasswordLink: "Забыли пароль?",
      loginButton: "Вход",
      loginGoogle: "Войти через",
      noAccount: "Нет аккаунта?",
      registerText: "Зарегистрироваться",
      errors: {
        enterEmail: "Введите e-mail",
        enterValidEmail: "Введите валидный e-mail",
        enterPassword: "Введите пароль",
        passwordMinLength: "Мин кол-во символов 5",
      },
      notifications: {
        errorTitle: "Ошибка",
        errorMessages: {
          BLOCKED_USER: "Пользователь заблокирован. Обратитесь в поддержку.",
          USER_DOES_NOT_EXIST: "Произошла ошибка, попробуйте еще раз",
          WRONG_PASSWORD: "Произошла ошибка, попробуйте еще раз",
        },
        errorMessage: "Произошла ошибка, попробуйте еще раз",
        verifyNoneMessage:
          "Загрузите документ подтверждающий вашу личность и дождитесь пока администратор подтвердит ваш аккаунт.",
        verifyWaitMessage:
          "Пожалуйста дождитесь пока администратор подтвердит ваш аккаунт.",
      },
    },
    signUpForm: {
      title: "Регистрация",
      iLookForModel: "Я ищу собеседника",
      iAmModel: "Я собеседник",
      namePlaceholder: "Имя*",
      emailPlaceholder: "E-mail*",
      passwordPlaceholder: "Пароль*",
      confirmPasswordPlaceholder: "Подтверждение пароля",
      agreeToRules1: "Регистрируясь, я соглашаюсь с",
      agreeToRules2: "Правилами сайта",
      iHaveRead: "Я прочел",
      signUpButton: "Регистрация",
      loginGoogle: "Войти через",
      alreadyRegistered: "Уже зарегистрированы?",
      logInText: "войти",
      errors: {
        enterName: "Введите имя",
        enterEmail: "Введите e-mail",
        enterValidEmail: "Введите валидный e-mail",
        enterPassword: "Введите пароль",
        passwordMinLength: "Мин кол-во символов 5",
        enterPasswordConfirmation: "Подтвердите пароль",
        passwordsDoesntMatch: "Пароли не совпадают",
      },
      notifications: {
        errorTitle: "Ошибка",
        errorMessage: "Произошла ошибка, попробуйте еще раз",
      },
    },
    index: {
      title: "Найдите себе интересного собеседника",
      description:
        "Тысячи людей готовы делиться с вами опытом и просто общаться",
      countriesPlaceholder: "Страны",
      countriesNoMatch: "Совпадений не найдено",
      citiesPlaceholder: "Города",
      citiesNoMatch: "Совпадений не найдено",
      citiesLoadingMore: "Загрузка дополнительных опций ...",
      agePlaceholder: "Возраст",
      ageNoMatch: "Совпадений не найдено",
      servicesPlaceholder: "Услуги",
      servicesNoMatch: "Совпадений не найдено",
      languagesPlaceholder: "Язык",
      languagesNoMatch: "Совпадений не найдено",
      searchButtonText: "Подобрать собеседника!",
      modelNotFound: "По данному запросу собеседники не найдены",
      showMore: "Показать еще",
      paymentMessageSuccess: "Оплата прошла успешно, деньги поступят на баланс",
    },
    girlCard: {
      goToProfileButtonText: "Перейти в профиль",
      notifications: {
        errorTitle: "Ошибка",
        errorRemovingFromFav:
          "Произошла ошибка при удалении собеседника из избранного",
        successRemovingFromFav: "Собеседник успешно удален из избранного",
        youShouldLogIn: "Вам нужно авторизоваться для этого действия",
        onlyFansCouldAddToFav:
          "Добавление в избранное доступно только обычным пользователям",
        errorAddingToFav:
          "Произошла ошибка при добавлении собеседника в избранное",
        successAddingToFav: "Собеседник успешно добавлен в избранное",
      },
    },
    profileHeader: {
      backToMain: "На главную",
    },
    profileBody: {
      userAge: "0 лет | {n} год | {n} года | {n} лет",
      itsYou: "(Это вы)",
      totalPosts: "Нет постов | {n} пост | {n} поста | {n} постов",
      favouritesCount:
        "Нет отслеживающих | {n} отслеживает | {n} отслеживают | {n} отслеживают",
      userBlocked: "Пользователь заблокирован!",
      subscribeButtonSub: "Подписаться",
      subscribeButtonProlong: "Продлить",
      perDay: "/ сутки",
      perMonth: "/ месяц",
      perMessage: "/ сообщение",
      chatButton: "Написать",
      buyBundleButton: "Купить",
      notifications: {
        errorTitle: "Ошибка",
        errorRemovingFromFav:
          "Произошла ошибка при удалении собеседника из избранного",
        successRemovingFromFav: "Собеседник успешно удален из избранного",
        youShouldLogIn: "Вам нужно авторизоваться для этого действия",
        onlyFansCouldAddToFav:
          "Добавление в избранное доступно только обычным пользователям",
        errorAddingToFav:
          "Произошла ошибка при добавлении собеседника в избранное",
        successAddingToFav: "Собеседник успешно добавлен в избранное",
        onlyFansCouldSubscribe:
          "Подписка доступна только обычным пользователям",
        onlyFansCouldBuyBundle: "Покупка доступна только обычным пользователям",
        alreadyInFav: "Собеседник уже добавлен в избранное",
        copySuccess: "скопирован в буфер обмена",
        copyFail: "Ошибка при копировании в буфер обмена",
      },
    },
    subscribePopup: {
      loading: "Загрузка...",
      userAge: "0 лет | {n} год | {n} года | {n} лет",
      youSubscribedUntil: "Вы подписаны на {name} до",
      newSubscription: "Новая подписка",
      pricePerDay: "Стоимость подписки в месяц:",
      yourBalance: "Ваш баланс:",
      subsDays: "Количество месяцев:",
      subDescr: "1 месяц равен 30 дням",
      totalAmount: "Стоимость:",
      notEnoughMoney1: "Ваших средств недостаточно для подписки,",
      notEnoughMoney2: "пополните баланс",
      subscribeButtonSub: "Оформить подписку",
      subscribeButtonProlong: "Продлить подписку",
      cancelButton: "Отмена",
      successMessage1: "Поздравляем, подписка успешно оформлена!",
      successMessage2: "Теперь Вы можете просматривать",
      successMessage3: "непубличные посты собеседника!",
      closeButton: "Закрыть",
      failureMessage: "Что-то пошло не так, попробуйте еще раз",
      notifications: {
        subscriptionSuccess: "Подписка успешно оформлена!",
        prolongationSuccess: "Подписка успешно продлена!",
      },
      subscriptionTitle: "Подписаться",
      perMonth: "/ месяц",
      months: "месяцев",
      withdrawFrom: "Списать:",
      fromBalance: "с баланса",
    },
    buyBundlePopup: {
      loading: "Загрузка...",
      userAge: "0 лет | {n} год | {n} года | {n} лет",
      messagesBundle: "Пакет сообщений:",
      yourBalance: "Ваш баланс:",
      bundlePrice: "Стоимость пакета:",
      notEnoughMoney1: "Ваших средств недостаточно для покупки,",
      notEnoughMoney2: "пополните баланс",
      buyButton: "Купить пакет",
      cancelButton: "Отмена",
      successMessage1: "Поздравляем, пакет успешно куплен!",
      successMessage2: "Теперь Вы можете общаться с собеседником в чате,",
      successMessage3: "используя сообщения из пакета!",
      closeButton: "Закрыть",
      failureMessage: "Что-то пошло не так, попробуйте еще раз",
      notifications: {
        purchaseSuccess: "Пакет сообщений успешно куплен!",
      },
      title: "Купить пакет",
      withdrawFrom: "Списать:",
      fromBalance: "с баланса",
    },
    bundle: {
      messagesQty:
        "0 сообщений | {n} сообщение | {n} сообщения | {n} сообщений",
      forParticle: "за",
      perMessage: "{price} HDC за сообщение!",
      limitedLeft: "Осталось {amount}",
      messageBundle: "Пакет сообщений",
      messages: "Сообщений",
      pricePerOne: "Цена за 1 сообщение",
    },
    posts: {
      publicPosts: "Открытые посты",
      privatePosts: "Закрытые посты",
    },
    postsList: {
      showMore: "Показать еще",
    },
    post: {
      thisIsPrivatePost: "Это закрытый пост",
      subscribeToSee: "Подпишитесь, чтобы увидеть закрытый контент",
      menuView: "Просмотр",
      menuEdit: "Редактировать",
      menuDelete: "Удалить",
      deleteConfirm: "Вы точно хотите удалить этот пост?",
      notifications: {
        postDeleted: "Пост успешно удален",
        youShouldLogIn: "Вам нужно авторизоваться для этого действия",
        onlyFansCouldSubscribe:
          "Подписка доступна только обычным пользователям",
        cantLoadPost: "Не удалось загрузить пост",
      },
    },
    postHeader: {
      backToProfile: "В профиль",
    },
    comments: {
      comments: "Комментарии",
    },
    commentsList: {
      showMore: "Показать еще",
    },
    commentView: {
      reply: "Ответить",
      delete: "Удалить",
    },
    newCommentsForm: {
      textPlaceholder: "Введите текст сообщения",
      errorNoMessage: "Введите комментарий",
    },
    profileCard: {
      balance: "Баланс",
      withdrawFunds: "Вывести",
      balanceHistory: "История баланса",
      like: "Нравится",
      goToChat: "Сообщение",
      userAge: "0 лет | {n} год | {n} года | {n} лет",
      changeAvatar: "Изменить аватар",
      changeCover: "Изменить обложку",
      subscribeButtonSub: "Подписаться",
      subscribeButtonProlong: "Продлить",
      perDay: "в сутки",
      postsTabTitle: "Посты",
      bundlesTabTitle: "Пакеты",
      modelsTabTitle: "Собеседники",
      settingsTabTitle: "Настройки",
      balanceTabTitle: "Баланс",
      bottomPartTitle: "Найдите себе собеседника по подписке",
      bottomPartDescription:
        "Описание в нескольких предложениях, чтобы было понятно о чем сервис",
      bottomPartButton: "Подписаться",
      notifications: {
        youShouldLogIn: "Вам нужно авторизоваться для этого действия",
        onlyFansCouldSubscribe:
          "Подписка доступна только обычным пользователям",
        onlyFansCouldAddToFav:
          "Добавление в избранное доступно только обычным пользователям",
        alreadyInFav: "Собеседник уже добавлен в избранное",
        errorTitle: "Ошибка",
        errorAddingToFav:
          "Произошла ошибка при добавлении собеседника в избранное",
        successAddingToFav: "Собеседник успешно добавлен в избранное",
        errorRemovingFromFav:
          "Произошла ошибка при удалении собеседника из избранного",
        successRemovingFromFav: "Собеседник успешно удален из избранного",
        errorUploadingAvatar: "Произошла ошибка при обновлении аватара",
        successUploadingAvatar: "Фото успешно обновлено",
        errorUploadingCover: "Произошла ошибка при обновлении обложки",
        successUploadingCover: "Обложка успешно обновлена",
      },
    },
    profilePosts: {
      edit: "Редактировать",
      delete: "Удалить",
      noPosts: "Постов пока нет",
      createNewPost: "Создать новый пост",
      newPostTitlePlaceholder: "Заголовок",
      newPostDescrPlaceholder: "Введите текст сообщения",
      newPostIsPublic: "Общедоступный пост",
      newPostAddFileButton: "Прикрепить файл",
      newPostPublishButton: "Опубликовать",
      privatePostPreviewTitle: "Непубличный пост",
      privatePostPreviewDescr: "Подпишись, чтобы увидеть!",
      deleteConfirm: "Вы точно хотите удалить этот пост?",
      errorEnterTitle: "Введите заголовок",
      errorEnterDescr: "Введите описание",
      notifications: {
        postDeleted: "Пост успешно удален",
        awaitForFilesProcessing: "Файлы обрабатываются, подождите",
        errorTitle: "Ошибка",
        errorAddFiles: "Прикрепите файлы",
        errorGeneric: "Произошла ошибка попробуйте позже",
        successPostCreated: "Пост успешно создан",
        errorFileLimitTitle: "Лимит файлов",
        errorFileLimitMessage: "Можно прикрепить не более 10 файлов",
        errorInvalidFileType: "Недопустимый тип файла {filename}",
      },
    },
    confirmPopup: {
      pleaseConfirm: "Подтвердите действие",
      confirm: "Подтвердить",
      cancel: "Отмена",
    },
    pleaseLoginPopup: {
      pleaseLogin: "Для совершения действия авторизуйтесь на сайте",
      login: "Авторизоваться",
      cancel: "Отмена",
    },
    profileBundles: {
      beenBought:
        "Покупок нет | Куплен {n} раз | Куплен {n} раза | Куплен {n} раз",
      delete: "Удалить",
      noBundles: "Пакетов пока нет, создайте новый с помощью формы",
      newBundle: "Создать новый пакет",
      newBundleQtyPlaceholder: "Количество сообщений",
      newBundlePricePlaceholder: "Стоимость пакета",
      newBundleDescrPlaceholder: "Краткое описание, максимум 50 символов",
      newBundleTypePlaceholder: "Тип пакета",
      newBundleAmountPlaceholder: "Количество пакетов",
      newBundleIsActive: "Активный пакет",
      newBundleCreate: "Создать",
      bundleTypesUnlimName: "Обычный",
      bundleTypesUnlimDescr:
        "Стандартный пакет, количество покупок которого ничем не ограничено",
      bundleTypesLimName: "Промо",
      bundleTypesLimDescr:
        "Промо пакет, количество покупок ограничено, после исчерпания автоматически отключается",
      deleteConfirm: "Вы точно хотите удалить этот пакет?",
      errorEnterAmount: "Введите количество",
      errorEnterQty: "Введите количество",
      errorDescriptionLength:
        "Описание не может быть длиннее {n} символов | Описание не может быть длиннее {n} символа | Описание не может быть длиннее {n} символов | Описание не может быть длиннее {n} символов",
      notifications: {
        errorTitle: "Ошибка",
        successBundleCreated: "Пакет успешно создан",
      },
    },
    profileSettings: {
      confirmEmailMessage:
        "Ваш email не подтвержден! Пожалуйста, подтвердите Ваш email, пройдя по ссылке из письма, которое было выслано Вам после регистрации. Если Вы не получали письмо - запросите его заново.",
      resendEmailConfirmation: "Запросить",
      waitFor: "Повторно через {seconds} сек.",
      oldPasswordPlaceholder: "Старый пароль*",
      newPasswordPlaceholder: "Новый пароль",
      pleaseConfirmEmail: "Пожалуйста, подтвердите Email",
      savePassword: "Сохранить",
      myProfile: "Информация обо мне",
      namePlaceholder: "Имя",
      agePlaceholder: "Возраст",
      profileUrlPlaceholder: "Название профиля",
      countriesPlaceholder: "Страны",
      citiesPlaceholder: "Город",
      servicesPlaceholder: "Услуги",
      languagesPlaceholder: "Языки",
      subscriptionEnabled: "Включить функционал подписки",
      pricePerDayPlaceholder: "Стоимость подписки в месяц",
      pricePerMessagePlaceholder: "Стоимость одного сообщения",
      aboutPlaceholder: "О себе",
      save: "Сохранить",
      errorEnterName: "Введите ваше имя",
      errorEnterAge: "Введите ваш возраст",
      errorProfileUrlNoSpaces: "Название профиля не должно содержать пробелов.",
      errorProfileUrlNotOnlyNums:
        "Название профиля не должно состоять только из цифр.",
      errorProfileUrlOnlyAlphabet:
        "Название профиля может содержать только строчные латинские символы, цифры и знак подчеркивания.",
      errorProfileUrlNotStartWithUnderscore:
        "Название профиля не может начинаться с подчеркивания.",
      errorPricePerDayNotLess1: "Введите корректную стоимость",
      errorPricePerMessageNotLess1: "Введите корректную стоимость",
      errorLanguagesShouldBeOne: "Введите хоть один язык",
      errorServicesShouldBeOne: "Введите хоть одну услугу",
      errorsProfileUrlIsTaken: "Профайл с таким именем уже существует",
      errorsEnterOldPass: "Введите старый пароль",
      errorsEnterNewPass: "Введите новый пароль",
      errorsNewPassMin5: "Мин кол-во символов 5",
      notifications: {
        errorGeneric: "Произошла ошибка попробуйте позже",
        errorTitle: "Ошибка",
        successProfileUpdated: "Информация успешно обновлена",
        successPasswordUpdated: "Пароль успешно изменен",
      },
    },
    profileBalance: {
      subscribersCount: "Подписчиков:",
      currentBalance: "Баланс на текущий момент",
      withdrawFunds: "Вывести деньги",
      enterTheAmount: "Введите сумму для вывода:",
      withdrawButton: "Вывести",
      rechargeAmount: "Сумма для пополнения:",
      rechargeButton: "Пополнить",
      rechargeNote1:
        "При пополнении баланса Heymaty.com взымает комиссию {comission}% от суммы пополнения. После пополнения за состоянием платежа можно следить в разделе 'История' ниже, информация там обновляется автоматически.",
      rechargeNote2:
        "Сумма выставленного счета, с учетом комиссий, составит: {amount} $",
      withdrawalAddress: "Адрес для вывода средств:",
      copy: "Копировать",
      qrCode: "QR",
      save: "Сохранить",
      notifications: {
        copySuccess: "скопирован в буфер обмена",
        copyFail: "Ошибка при копировании в буфер обмена",
        errorRechargeAmountIncorrect: "Сумма для пополнения некорректна",
        errorTooManyRequests: "Слишком много запросов, попробуйте позже",
        errorCreatingInAddress: "Ошибка при создании платежного адреса",
        errorGeneric: "Произошла ошибка попробуйте позже",
        errorTitle: "Ошибка",
        successUpdatingWithdrawalAddress: "Информация успешно обновлена",
        errorWithdrawalAmountIncorrect: "Запрошенная сумма вывода некорректна!",
        successWithdraw: "Сумма {amount} $",
      },
      errorInvalidWithdrawalAddress: "Введите правильный кошелёк",
    },
    profileGirls: {
      subscriptions: "Подписки",
      photo: "Фото",
      nameAge: "Имя, возраст",
      pricePerDay: "Цена за месяц",
      model: "Собеседник",
      subscriptionEnds: "Подписка закончится через",
      remain: "Осталось:",
      prolong: "Продлить",
      messageBundles: "Пакеты сообщений",
      messagesAmount: "Количество сообщений",
      seeMoreModels: "Смотреть других собеседников",
      d: "дн.",
      h: "ч.",
      m: "мин.",
      s: "сек.",
    },
    modelMessagesLeft: {
      loading: "Загрузка...",
    },
    balanceHistory: {
      history: "История",
      externalPayments: "Внешние платежи",
      internalPayments: "Внутренние платежи",
    },
    externalPayments: {
      date: "Дата",
      amount: "Сумма",
      direction: "Статус",
      status: "Состояние",
      info: "Инфо",
      adding: "Зачисление",
      substracting: "Списание",
      transStatusMessage: {
        unknown: "Неизвестно",
        created: "Создан",
        confirmed: "Утвержден",
        failed: "Не удался",
        delayed: "Задержан",
        pending: "Частично",
      },
      reqStatusMessage: {
        unknown: "Неизвестно",
        created: "Создан",
        confirmed: "Утвержден",
        rejected: "Отклонен",
      },
      succeeded: "Успешно",
      waiting: "Ожидание",
      pay: "Оплатить"
    },
    internalPayments: {
      date: "Дата",
      amount: "Сумма",
      direction: "Статус",
      status: "Состояние",
      info: "Инфо",
      adding: "Зачисление",
      substracting: "Списание",
      subscriber: "Подписчик:",
      model: "Собеседник:",
      actualPayoutDateTitle: "Дата фактического зачисления средств на счет",
      actualPayoutDate: "Дата выплаты:",
      plannedPayoutDateTitle: "Планируемая дата зачисления средств на счет",
      plannedPayoutDate: "Дата выплаты:",
      forSub: "За подписку",
      forMessage: "За сообщение",
      forBundle: "За пакет",
      forDonation: "Донат",
      claimButton: "Обжаловать",
      infoButton: "Информация",
      prev: "Пред",
      next: "След",
      transStatus: {
        inWait: "В ожидании",
        finished: "Утвержден",
        holded: "Заморожен",
        refunded: "Возмещен",
      },
    },
    claimInfoPopup: {
      loading: "Загрузка...",
      paymentTo: "Платеж собеседнику:",
      userAge: "0 лет | {n} год | {n} года | {n} лет",
      paymentFrom: "Платеж от пользователя:",
      paymentAmount: "Сумма платежа:",
      period: "За период:",
      forMessage: "За сообщение",
      forBundle: "За пакет",
      forDonation: "Донат",
      paymentInfo: "Информация о платеже",
      infoRefunded:
        "Возмещен - платеж был на обжаловании и был возмещен пользователю.",
      infoHolded:
        "Заморожен - платеж находится на обжаловании в данный момент.",
      infoFinished: "Утвержден - платеж успешно перечислен собеседнику.",
      infoInWait: "В ожидании - платеж ожидает срока оплаты собеседнику.",
      plannedDate: "Планируемый срок зачисления -",
      infoClaim:
        "В отношении этого платежа было или все еще существует обжалование.",
      closeButton: "Закрыть",
    },
    claimPaymentPopup: {
      loading: "Загрузка...",
      userAge: "0 лет | {n} год | {n} года | {n} лет",
      paymentAmount: "Сумма платежа:",
      period: "За период:",
      forMessage: "За сообщение",
      forBundle: "За пакет",
      forDonation: "Донат",
      requestForAppeal: "Заявка на обжалование",
      requestInfo1:
        "Пожалуйста опишите как можно подробней суть Ваших претензий,",
      requestInfo2: "мы рассмотрим Вашу заявку в кратчайшее время.",
      title: "Заголовок:",
      descr: "Описание:",
      appeal: "Обжаловать",
      cancel: "Отмена",
      success: "Заявление на обжалование отправлено успешно",
      failure: "Что-то пошло не так, попробуйте еще раз",
      close: "Закрыть",
      errorEnterTitleOrDescr: "Заполните заголовок и описание",
      notifySuccess: "Жалоба успешно направлена на рассмотрение!",
    },
    dialoges: {
      searchPlaceholder: "Поиск по сообщениям",
      chooseRespondent: "Выберите собеседника",
      title: "Ваши сообщения",
    },
    chatCard: {
      you: "Вы: ",
    },
    chatMessages: {
      userAge: "0 лет | {n} год | {n} года | {n} лет",
      youSpentBundle: "Вы тратите сообщения из пакета: {messages}",
      youSpentBalance:
        "Вы тратите баланс: {pricePerMessage} HDC/сообщение ({balance} HDC)",
      notEnoughFunds:
        "У вас недостаточно средств либо сообщений в пакете для общения.",
      recharge: "Пополните баланс",
      orWord: ", либо",
      buyBundle: "купите пакет сообщений",
      userBlocked: "Пользователь заблокирован!",
      donateButton: "Донат",
      searchPlaceholder: "Поиск по сообщениям",
      enterYourMessagePlaceholder: "Введите текст сообщения",
      notifications: {
        notEnoughFunds: "Недостаточно средств или нет сообщений в пакете",
        pleaseEnterTheMessage: "Введите сообщение или прикрепите файлы",
        awaitForFilesProcessing: "Файлы обрабатываются, подождите",
        errorSendingMessage: "Ошибка при отправке сообщения",
        errorFileLimitTitle: "Лимит файлов",
        errorFileLimitMessage: "Можно прикрепить не более 10 файлов",
        errorInvalidFileType: "Недопустимый тип файла {filename}",
      },
    },
    beforeFooter: {
      title: "Найдите себе собеседника по душе",
      description: `HeyMaty - это сервис где вы сможете платить за опыт и общение с другими людьми. Блогеры, музыканты, медийные личности и просто 
      профессионалы своего дела всегда доступны для общения.`,
    },
    footer: {
      privacyPolicy: "Политика приватности",
      rules: "Правила сервиса",
    },
    privacy: {
      title: "Политика конфиденциальности",
      p1: "Мы не разглашаем ничего никому и все такое.",
      p2: "Придумать или скопировать откуда-либо политику приватности",
    },
    rules: {
      title: "Правила использования сервиса",
      p1: "Правила будут здесь",
      p2: "Придумать или скопировать откуда-либо типовые правила",
      goFindButton: "Найти собеседника!",
    },
    popularWidget: {
      popular: "Популярное",
      userAge: "0 лет | {n} год | {n} года | {n} лет",
    },
    favourites: {
      title: "Вам понравились",
      noFavourites: "Собеседников в избранном нет",
      goToMainPage: "Перейти на главную",
    },
    forgotPasswordPopup: {
      forgotPassword: "Забыл пароль",
      resetPasswordButton: "Сбросить пароль",
      remeberPassword: "Вспомнили пароль?",
      logIn: "Войти",
      errorEnterEmail: "Введите e-mail",
      errorEnterValidEmail: "Введите валидный e-mail",
      notifications: {
        errorGeneric: "Произошла ошибка попробуйте позже",
        errorTitle: "Ошибка",
        successPasswordReset:
          "Код для восстановления пароля отправлен на почту",
      },
    },
    postEdit: {
      backToPost: "Вернуться к посту",
      editPost: "Редактировать пост",
      titlePlaceholder: "Заголовок",
      descrPlaceholder: "Введите текст сообщения",
      isPublic: "Общедоступный пост",
      addAttachments: "Добавить файлы",
      saveButton: "Сохранить",
      cancelButton: "Отмена",
      error403: "Доступ закрыт",
      error: "Ошибка",
      notifications: {
        awaitForFilesProcessing: "Файлы обрабатываются, подождите",
        errorGeneric: "Произошла ошибка попробуйте позже",
        errorTitle: "Ошибка",
        successPostEdited: "Пост успешно изменен",
        errorFileLimitTitle: "Лимит файлов",
        errorFileLimitMessage: "Можно прикрепить не более 10 файлов",
        errorInvalidFileType: "Недопустимый тип файла {filename}",
      },
      errorEnterTitle: "Введите заголовок",
      errorEnterDescr: "Введите описание",
    },
    errorPage: {
      404: "Страница не найдена",
      401: "Требуется авторизация",
      403: "Доступ закрыт",
      generic: "Возникла ошибка",
      goBackHome: "Вернуться на главную",
    },
    verifyPage: {
      verification: "Процесс верификации",
      description:
        "HeyMaty внедрила процедуру онлайн-проверки, которая требует, чтобы вы заполнили анкету и приложили определенные документы.",
      pleaseUploadNationalId: "Загрузите документ подтверждающий вашу личность",
      pleaseAwait: "Ожидайте подтверждение профиля администратором",
      attachId: "Прикрепить",
      sendButton: "Отправить",
      notifications: {
        errorTitle: "Ошибка",
        errorAttachId: "Прикрепите документ",
        errorGeneric: "Произошла ошибка. Попробуйте позже",
        successUploaded: "Документ успешно загружен. Ожидайте подтверждение",
      },
      stepFrom: "Шаг {step} из {from}:",
      fieldRequired: "Поле обязательное для заполнения",
      requestSent: "Ваш запрос был отправлен",
      youWillReceiveEmail:
        "Вы получите ответ на вашу электронную почту в течение 24 часов",
      popup: {
        title: "Требования к документам",
        subtitle: "Пожалуйста, придерживайтесь этих правил",
        iUnderstandButton: "Я понимаю",
        uploadThis: {
          title:
            "Чтобы пройти идентификацию личности, вам нужно загрузить один из этих документов:",
          idsList: `Документ, подтверждающий личность:
          Загранпаспорт (информационная страница)
          ID-карта (обе стороны)
          Водительское удостоверение (обе стороны)`,
          addressList: `Документ, подтверждающий адрес проживания:
          Справка о проживании, выданная государством или органом местного самоуправления;
          Выписка из банка;
          Счет за коммунальные услуги, выданный на ваш домашний адрес;
          Налоговая декларация, муниципальный налог;`,
          notAllowedList: `Список документов, которые не могут быть приняты для прохождения нашего KYC:
          Судебные документы;
          Документы, выданные государством или другими органами;`,
        },
        documentsRequirements: {
          title:
            "Пожалуйста, убедитесь, что ваши документы соответствуют нашим требованиям",
          list: `Документы должны быть полностью видны (водяные знаки допустимы);
          Документы могут быть отсканированы или сфотографированы;
          Максимальный размер файла – 10Мб;
          Изображения должны быть цветными и в хорошем качестве, а информацию на документе должно быть четко видно;
          Все документы должны быть действительны на момент отправки;
          Документ, подтверждающий ваш адрес, не должен был быть выдан более трех месяцев назад, и на нем должны быть указаны ваше полное имя и адрес проживания.
          Документ должен быть действителен как минимум 30 дней со дня подачи заявки на верификацию`,
        },
      },
      nextStepButton: "Следующий шаг",
      prevStepButton: "Предыдущий шаг",
      step1: {
        title: "Информация",
        personal: "Персональная информация",
        fieldName: "Имя",
        fieldSecondName: "Отчество",
        fieldFamilyName: "Фамилия",
        fieldDOB: "Дата рождения",
        fieldSex: "Пол",
        sexOptions: {
          male: "Мужской",
          female: "Женский",
        },
        address: "Адрес проживания",
        fieldCountry: "Страна",
        fieldCity: "Город",
        fieldStreet: "Улица",
        fieldBuilding: "Дом",
        fieldAppartment: "Квартира",
        fieldZIP: "Почтовый индекс",
      },
      step2: {
        title: "ID",
        description:
          "Вы можете загрузить один из следующих документов: паспорт, ID-карту или водительское удостоверение.",
        documentsRequirements1: "Графическое редактирование фото запрещено",
        documentsRequirements2:
          "Просроченные или чужие документы не принимаются",
        documentsRequirements3:
          "Документ должен быть действителен как минимум 30 дней со дня подачи заявки на верификацию",
        passportButton: "Паспорт",
        idCardButton: "ID-карта",
        driversLicenseButton: "Водительское удостоверение",
        expirationDate: "Срок действия",
        noExpiration: "Бессрочный",
        noExpirationDescr: "(только для бессрочных документов)",
        reqTitle:
          "Пожалуйста, убедитесь, что ваше фото соответствует следующим требованиям:",
        req1: "Все детали хорошо видны;",
        req2: "Изображение в формате JPG или PNG;",
        req3: "Весь документ виден;",
        req4: "Скриншоты запрещены;",
        uploadOrDrop: "Загрузить или добавить файл",
        passport: {
          title: "Загрузите информационную страницу вашего паспорта",
        },
        idCard: {
          title: "Загрузите обе стороны ID-карты",
          front: "Загрузите лицевую сторону",
          back: "Загрузите обратную сторону",
        },
        driversLicense: {
          title: "Загрузите обе стороны удостоверения",
          front: "Загрузите лицевую сторону",
          back: "Загрузите обратную сторону",
        },
      },
      step3: {
        title: "Селфи",
        description: "Загрузите селфи с вашим документом",
        description2:
          "Селфи нужно сделать с тем документом, который вы загрузили на предыдущем шаге.",
        reqTitle: "Требования к фотографиям",
        req1: "Лицо отчетливо видно",
        req2: "Есть сегодняшняя дата",
        req3: "Отчетливо видны паспортные данные",
        req4: "Есть ваша подпись",
        req5: "Есть надпись 'HeyMaty.com'",
        req6: "Надпись сделана от руки",
        reqFootNote:
          "Если вам сложно сделать селфи самому, то попросите друзей сделать ваше селфи с документом.",
        uploadButton: "Загрузить фото",
      },
    },
    coinbasePaymentPopup: {
      loading: "Загрузка...",
      username: "Пользователь: {username}",
      amount: "Сумма: {amount} {currency}",
      amountToAdd: "Зачислится: {amount} HDC",
      chooseCrypto: "Выберите удобную для Вас криптовалюту:",
      send: "Переведите:",
      amountCopyTitle: "Скопировать в буфер обмена",
      sendTo: "На адрес:",
      sendToCopyTitle: "Скопировать в буфер обмена",
      copyAdvise:
        "Совет - нажмите на адрес или сумму для копирования в буфер обмена.",
      infoText:
        "Пока не закрыто это окно мы постоянно проверяем статус платежа, и уведомим Вас при подтверждении получения средств",
      currentStatus: "Текущий статус: {status}",
      cancelButton: "Отменить",
      success1: "Поздравляем, средства были успешно",
      success2: "зачислены на Ваш баланс!",
      closeButton: "Закрыть",
      failureExpired:
        "Время для совершения платежа истекло, создайте пополнение заново.",
      failureGeneric: "Что-то пошло не так, попробуйте еще раз",
      statuses: {
        waiting: "Ожидание",
        created: "Создано",
        confirmed: "Подтверждено",
        pending: "Частично",
      },
      notifications: {
        copySuccess: "скопирован в буфер обмена",
        copyFail: "Ошибка при копировании в буфер обмена",
      },
    },
    remainTimeLine: {
      waitingForPayment: "Ожидание платежа: {timestr}",
    },
    messagesNotifications: {
      userDonated: "Пользователь {username} прислал донат!",
      newDonationTitle: "Новый донат!",
      newMessageTitle: "Новое сообщение от {username}",
    },
    donatePopup: {
      loading: "Загрузка...",
      userAge: "0 лет | {n} год | {n} года | {n} лет",
      newDonation: "Донат для собеседника",
      yourBalance: "Ваш баланс:",
      donationAmount: "Сумма:",
      enterYourMessagePlaceholder: "Сообщение",
      disclaimer:
        "При отправке доната дополнительно удерживется стоимость сообщения.",
      notEnoughMoney1: "Ваших средств недостаточно для доната,",
      notEnoughMoney2: "пополните баланс",
      donateButton: "Отправить",
      cancelButton: "Отмена",
      successMessage1: "Ваш донат отправлен!",
      successMessage2: "Собеседник получит уведомление",
      successMessage3: "и увидит сообщение в чате.",
      closeButton: "Закрыть",
      failureMessage: "Что-то пошло не так, попробуйте еще раз",
      notifications: {
        notEnoughFunds: "Недостаточно средств!",
        pleaseEnterTheMessage: "Введите сообщение",
        pleaseEnterTheDonation: "Введите сумму доната",
        donationSuccess: "Донат успешно отправлен!",
        errorSendingDonation: "Произошла ошибка при отправке доната",
      },
    },
    chatMessage: {
      donation: "Донат: {donation} HDC",
    },
    welcome: "Добро пожаловать",
  });
};