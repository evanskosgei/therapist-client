import visa from "./img/visa.png"
import paypal from "./img/paypal.png"
import mpesa from './img/mpesa.png'
import client from './img/how/client.jpg'
import therapist from './img/how/therapist.jpg'
import vmeet from './img/how/virtual-meet.jpg'
import payment from './img/how/payment.jpg'
import article from './img/how/articles.jpg'

const ImgData = (img) => {
    const images = {
        visa,
        paypal,
        mpesa,

        client,
        therapist,
        vmeet,
        payment,
        article
    }
    return images[img]
}

export default ImgData;