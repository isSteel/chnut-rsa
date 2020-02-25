import React, { Component } from 'react';
import RSA from './RSA';

import {
    Typography,
    Button,
    Drawer,
    Input,
    Modal,
    Tooltip,
} from 'antd';

const { Title } = Typography;

export class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    showDrawer = () => {
        this.setState({
            visible: true
        });
    }

    closeDrawer = () => {
        this.setState({
            visible: false
        });
    }

    render() {
        return (
            <div className='info'>
                <Button type='primary' onClick={this.showDrawer}>Про RSA</Button>
                <Drawer
                    title="Алгоритм RSA"
                    placement='right'
                    width='75%'
                    closable
                    onClose={this.closeDrawer}
                    visible={this.state.visible}
                    bodyStyle={{
                        fontSize: '16px',
                        textAlign: 'justify' 
                    }}
                >
                    <p>RSA — криптографічна система з відкритим ключем.</p>
                    <p>
                        RSA став першим алгоритмом такого типу, придатним і для
                        шифрування і для цифрового підпису. Алгоритм використовується
                        у великій кількості криптографічних застосунків.
                    </p>

                    <Title level={3}>Історія</Title>
                    <p className='indent'>
                        Опис RSA було опубліковано у 1977 році Рональдом Райвестом (Ronald Linn Rivest), Аді Шаміром (Adi Shamir) 
                        і Леонардом Адлеманом (Leonard Adleman) з Масачусетського Технологічного Інституту (MIT). <br />
                        Британський математик Кліфорд Кокс (Clifford Cocks), що працював в центрі урядового зв'язку (GCHQ) 
                        Великобританії, описав аналогічну систему в 1973 році у внутрішніх документах центру, але ця робота не 
                        була розкрита до 1997 року, тож Райвест, Шамір і Адлеман розробили RSA незалежно від роботи Коксу. <br />
                        В 1983 році був виданий патент 4405829 США, термін дії якого минув 21 вересня 2000 року.
                    </p>

                    <Title level={3}>Опис алгоритму</Title>
                    <p className='indent'>
                        Безпека алгоритму RSA побудована на принципі складності факторизації. Алгоритм використовує два ключі — відкритий (public) 
                        і секретний (private), разом відкритий і відповідний йому секретний ключі утворюють пари ключів (keypair). Відкритий ключ 
                        не потрібно зберігати в таємниці, він використовується для шифрування даних. Якщо повідомлення було зашифровано відкритим ключем, 
                        то розшифрувати його можна тільки відповідним секретним ключем.
                    </p>
                    
                    <Title level={4}>Генерація ключів</Title>
                    <span>Для того, щоб згенерувати пари ключів виконуються такі дії:</span>
                    <ol>
                        <li>Обираються два великих простих числа <i>p</i> та <i>q</i></li>
                        <li>Обчислюється їх добуток <i>n=pq</i></li>
                        <li>Обчислюється Функція Ейлера  <i>φ(n)=(p−1)(q−1)</i></li>
                        <li>Обирається ціле e таке, що <i>1 &lt; e &lt; φ(n)</i> та <i>e</i> взаємно просте з  <i>φ(n)</i></li>
                        <li>За допомогою розширеного алгоритма Евкліда знаходиться число <i>d</i> таке, що <i>ed≡1(modφ(n))</i></li>
                    </ol>
                    <p className='indent'>
                        Число n називається модулем, а числа <i>e</i> і <i>d</i> — відкритою й секретною експонентами, відповідно. Пари чисел <i>(n,e)</i> є відкритою частиною ключа, 
                        а <i>(n,d)</i> — секретною. Числа <i>p</i> і <i>q</i> після генерації пари ключів можуть бути знищені, але в жодному разі не повинні бути розкриті.
                    </p>

                    <Title level={4}>Шифрування й розшифрування</Title>
                    <span className='indent'>Для того, щоб зашифрувати повідомлення m&lt;n обчислюється</span>
                    <p className='indent'><i>c=m<sup>e</sup> mod n</i></p>
                    <span>Число c використовується в якості шифротексту. Для розшифрування потрібно обчислити:</span>
                    <p className='indent'><i>c = m<sup>e</sup> mod n</i></p>
                    <span>Неважко переконатися, що при розшифруванні ми відновимо вихідне повідомлення:</span>
                    <p className='indent'><i>c<sup>d</sup> ≡ (m<sup>e</sup>)<sup>d</sup> ≡ m<sup>ed</sup> (mod n)</i></p>
                    <span>З умови</span>
                    <p className='indent'><i>ed ≡ 1 (mod φ(n))</i></p>
                    <span>виходить, що</span>
                    <p className='indent'><i>ed=kφ(n)+1 для деякого цілого k, отже</i></p>
                    <p className='indent'><i>m<sup>ed</sup> ≡ m<sup>kφ(n)+1</sup> (mod n)</i></p>
                    <span>Згідно теореми Ейлера:</span>
                    <p className='indent'><i>m<sup>φ(n)</sup> ≡ 1 (mod n),</i></p>
                    <span>тому</span>
                    <p className='indent'><i>m<sup>kφ(n)+1</sup> ≡ m (mod n)</i></p>
                    <p className='indent'><i>c<sup>d</sup> ≡ m (mod n)</i></p>

                    <Title level={4}>Цифровий підпис</Title>
                    <p className='indent'>
                        RSA може використовуватися не тільки для шифрування, але й для цифрового підпису. 
                        Підпис <i>s</i> повідомлення <i>m</i> обчислюється з використанням секретного ключа за формулою:
                    </p>
                    <p className='indent'><i>s = m<sup>d</sup> mod n</i></p>
                    <p className='indent'>
                    Для перевірки правильності підпису потрібно переконатися, що виконується рівність
                    </p>
                    <p className='indent'><i>m = s<sup>e</sup> mod n</i></p>
                </Drawer>
            </div>
        )
    }
}

export function Header() {
    return (
        <Title level={2}>Демонстрація алгоритму RSA</Title>  
    )
}

export class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messageEncoded: '',
            messageEncrypted: '',
            messageDecrypted: '',
            inputDisabled: true,
            isMessageEncoded: false,
            isMessageEncrypted: false,
            isModalVisible: false,
            n: '',
            d: '',
            e: '',
            tempN: '',
            tempD: '',
        };
        this.messageChange = this.messageChange.bind(this);
        this.nChange = this.nChange.bind(this);
        this.dChange = this.dChange.bind(this);
    }

    generateKeys = () => {
        const keys = RSA.generate(250);

        this.setState({
            inputDisabled: false,
            n: keys.n.toString(),
            d: keys.d.toString(),
            e: keys.e.toString(),
            tempN: '',
            tempD: '',
        })
    }

    messageChange = event => {
        this.setState({
            message: event.target.value
        })
    }

    encode = () => {
        this.setState({
            messageEncoded: RSA.encode(this.state.message),
            isMessageEncoded: true
        });
    }

    encrypt = () => {
        this.setState({
            messageEncrypted: RSA.encrypt(this.state.messageEncoded, this.state.n, this.state.e),
            isMessageEncrypted: true
        })
    }

    decrypt = (d, n) => {
        this.setState({
            messageDecrypted: RSA.decrypt(this.state.messageEncrypted, d, n),
        })
    }

    toggleDecryptModal = () => {
        this.setState({
            isModalVisible: !this.state.isModalVisible,
        })
    }

    nChange = e => { this.setState({ tempN: e.target.value }) };
    dChange = e => { this.setState({ tempD: e.target.value }) };

    render() {
        const encrypted = (this.state.messageEncrypted).toString();
        const encoded = (this.state.messageEncoded).toString();
        const decrypted = (this.state.messageDecrypted).toString();
        const decoded = decrypted && RSA.decode(decrypted);

        return (
            <div className='body'>
                <Button onClick={this.generateKeys} className='button'>Згенерувати ключі</Button>
                <div className='text'>
                    <p>
                        Публічний ключ: <b>{this.state.n}</b><br /><br />
                        Приватний ключ: <b>{this.state.d}</b><br /><br />
                        Експонента: <b>{this.state.e}</b><br /><br />
                    </p>
                </div>

                <div className="message-input">
                    <Input size='large' placeholder='Повідомлення' disabled={this.state.inputDisabled} onChange={this.messageChange} />
                </div>
                <Button disabled={this.state.inputDisabled} onClick={this.encode} className='button'>Закодувати</Button>
                <div className='text'>
                    <p>
                        Закодоване повідомлення: <b>{encoded}</b>
                    </p>
                </div>
                <Button disabled={!this.state.isMessageEncoded} onClick={this.encrypt} className='button'>Зашифрувати повідомлення</Button>
                <div className='text'>
                    <p>
                        Ваше зашифроване повідомлення: <b>{encrypted}</b>
                    </p>
                </div>
                <Button disabled={!this.state.isMessageEncrypted} onClick={this.toggleDecryptModal} className='button'>Розшифрувати повідомлення</Button>
                <Modal
                    title='Розшифрування'
                    visible={this.state.isModalVisible}
                    onCancel={this.toggleDecryptModal}
                    footer={null}
                    width='70vw'
                >
                    <Input className='modal-input' size='small' addonBefore='Шифр' value={this.state.messageEncrypted} disabled />
                    <Input allowClear className='modal-input' addonBefore='Public key' value={this.state.tempN || this.state.n} onChange={this.nChange} />
                    <Input allowClear addonBefore='Private key' value={this.state.tempD || this.state.d} onChange={this.dChange} />
                    <Tooltip
                        placement='right'
                        title='Також можна змінити згенеровані значення ключів на довільні, для перевірки алгоритму.'
                    >
                        <Button
                            className='button'
                            type='primary' 
                            onClick={() => this.decrypt((this.state.tempD || this.state.d), (this.state.tempN || this.state.n))}
                        >
                            Підтвердити
                        </Button>
                    </Tooltip>
                    <div className={`text decrypted ${decoded ? (decoded === this.state.message ? 'success' : 'fail') : ''}`}>
                        <p>{decrypted}</p>
                        <p>{decoded}</p>
                    </div>
                </Modal>
            </div>
        )
    }
}
