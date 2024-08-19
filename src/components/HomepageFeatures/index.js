import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import SyntaxHighlighter from "react-syntax-highlighter";
import * as codeStyle from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {Divider} from "@material-ui/core";
import CopyButton from "@docusaurus/theme-classic/lib/theme/CodeBlock/CopyButton";
import React from ".";
import CopyPlugin from "highlightjs-copy";
import hljs from "highlight.js";

hljs.addPlugin(new CopyPlugin())
// CopyPlugin()
const FeatureList = [
    {
        title: 'Установите через composer',
        codeLanguage: 'bash',
        code: "composer require thumbrise/toolkit",
        description: (
            <>
                Что с этим делать?
            </>
        ),
    },
    {
        title: 'Абстрагирование от HTTP',
        codeLanguage: 'php',
        code: `// Успех операции
OperationResult::success($anyTypeData);
        
// Ожидаемая ошибка бизнес уровня
OperationResult::error('Что-то пошло не так', SomeEnum::SomeCase);`,
        description: (
            <>
                Верни результат в контроллер.
                О статусах и заголовках подумаешь потом.
            </>
        )
        // description: (
        //     <>
        //         Но что делать если что-то пошло не так? Выбросить исключение?
        //     </>
        // ),
    },
    {
        title: 'Единый стиль обработки ошибок на разных уровнях бизнес слоя',
        codeLanguage: 'php',
        code: `$opresult = $someSystem->handle();
if($opresult->isError()){
    return $opresult;
}`,
        description: (
            <>
                Исключения имеют GOTO семантику. Но ошибки имеют четкий поток выполнения сверху вниз.
            </>
        ),
    },
    {
        title: 'Отложи http статусы ошибок на потом',
        codeLanguage: 'php',
        code: `// Метод Http контроллера
public function someMethod(Request $request, SomeUsecase $usecase){
    OperationResult::bindHttpStatuses([
        401 => [MyErrors::Unauthorized],
        422 => [MyErrors::Validation],
    ]);
    
    // Возвращает OperationResult
    return $usecase->handle($request->input()); 
} 
`,
        description: (
            <>
                <div>При потребности следовать http REST семантике - свяжи внутренние ошибки с http статусами. </div>
                <div>Пакет предоставляет 3 сценария json ответа.</div>
                <div>Успех, ошибка сценария, ошибка валидации ввода</div>
            </>
        ),
    },
    {
        title: '1. Успех операции',
        codeLanguage: 'json',
        code: `{
  // data это то, что мы положили в OperationResult::success($data)
  data: {
    "anyData": "anyData"
  } 
  // data: 15
  // data: "OK"
  // data: [1, 2, 3, 4]
}  
`,
        description: (
            <>
                При успехе доступен единственный ключ 'data'
            </>
        ),
    },
    {
        title: '2. Бизнес ошибка',
        codeLanguage: 'json',
        code: `{
   // Мы сами определяем текст ошибки
   error_message: "Недостаточно средств",
   
   // Мы сами определяем код ошибки 
   // Есть ли такой статус в HTTP? =)
   error_code: "ErrorsOrder/NotEnoughMoney",
     
   // Контекст можно скрыть в production среде. 
   // Удобно при разработке
   error_context: {    
     where: "path/to/file:15" 
   }
}  
`,
        description: (
            <>
                Присутствуют 3 обязательных поля ошибки.
                Если data отсутствует, значит гарантированно будут эти поля.
                <div>Не относится к вводу формы пользователем. Можно выводить в тосте</div>
            </>
        ),
    },
    {
        title: 'Стандартизированная ошибка валидации',
        codeLanguage: 'json',
        code: `{
  // Невалидные поля.
  // Используется валидатор Laravel
  error_fields: { 
    email: [
      "Email уже занят",
    ],
    password: [
      "Пароль слишком простой",
    ],
    passwordConfirmation: [
      "Пароль слишком простой",
      "Пароль не совпадает",
    ]
  },
  
  // Можно переопределить.
  // Можно использовать Laravel переводы.
  // Под капотом используется __()
  error_message: "Ошибка валидации",
  
  // Можно переопределить.
  error_code: "ErrorsBasic/Validation",
    
  error_context: {
    where: "path/to/file:15" 
  }
}  
`,
        description: (
            <>
                Присутствуют 3 обязательных поля ошибки.
                Если data отсутствует, значит гарантированно будут эти поля.
            </>
        ),
    },
];

function Feature({code, title, description}) {
    return (
        <>
            <div className="row">
                <div className={clsx('col col--12')}>
                    <div className="text--center padding-horiz--md">
                        <Heading as="h3">{title}</Heading>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className={clsx('col col--12')}>
                    <SyntaxHighlighter customStyle={{
                        padding: "20px",
                        position: "relative",
                        width: 'fit-content',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                                       language="php"
                                       style={codeStyle.ocean}
                                       useInlineStyles
                                       wrapLines={false}
                                       wrapLongLines={true}
                    >
                        {code}
                    </SyntaxHighlighter>

                </div>
            </div>
            <div className="row">
                <div className={clsx('col col--12')}>
                    <div className="text--center padding-horiz--md">
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                {FeatureList.map((props, idx) => (
                    <>
                        <Feature key={idx} {...props} />
                        <Divider style={{marginBottom: "30px", backgroundColor: "#97c4d0"}}/>
                    </>
                ))}
            </div>
        </section>
    );
}
