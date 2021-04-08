# Убрать рекламу из Яндекс.Почта

![gif](./demo/2021-04-08-12-29.gif)

> Дописано [это](https://github.com/hindmost/cra-rich-chrome-ext-example)

## Roadmap

**UX**

- [ ] Убрать псевдо авторизацию для активации работы расширения;
- [ ] _Сейчас реклама убирается через 5 сек **только после перехода на вкладку** (задержка сделана для того, чтоб Яндекс успел добавить свою рекламу на страницу)._ Планируется выполнять действие `removeAdv()` при активации расширения;
  - [ ] На текущей вкладке;
- [ ] Добавить icons;

_Добавить пользовательские настройки:_

- [ ] Для указания селекторов блоеов рекламы на странице;
- [ ] Дать возможность пользователю динамически указывать шаблоны урлов сайтов для работы расширения;
- [ ] Отправлять настройки на удаленный сервер для сохранения в базе и запрашивать их из расширения (если пользователь ей доверяет);

# cra-rich-chrome-ext-example

An example of full-fledged, rich UI Chrome extension built with Create React App and Redux.

<p align='center'>
<img src='https://repository-images.githubusercontent.com/286774997/de8a4080-dbfe-11ea-8a53-4b02284a7145' width='600' border='1' alt='screencast'>
</p>

## Includes

* [Create React App](https://www.github.com/facebook/create-react-app) setup with custom template [`complex-browserext`](https://www.npmjs.com/package/cra-template-complex-browserext) applied.
* [Redux](https://www.github.com/reduxjs/redux) + [React Redux](https://github.com/reduxjs/react-redux).
* [Reduxed Chrome Storage](https://github.com/hindmost/reduxed-chrome-storage).
* [Semantic UI React](https://github.com/Semantic-Org/Semantic-UI-React).

## License

Licensed under the MIT license.
