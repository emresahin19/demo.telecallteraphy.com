import { useState } from "react";

export const dateConvert = (date) => {
    let unix_timestamp = Date.parse(date);
    var date = new Date(unix_timestamp);
    var months = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
    var _year = date.getFullYear();
    var _month = months[date.getMonth()];
    var _getday = date.getDate();
    _getday = _getday < 10 ? ('0' + _getday) : _getday;

    return `${_getday} ${_month} ${_year}`;
}

export const timeConvert = (time) => {
    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(time / 60);
    let hours = Math.floor(time / 60);
    
    seconds = checkTime(seconds % 60);
    minutes = checkTime(minutes % 60);
    hours = checkTime(hours % 24);

    return `${hours}:${minutes}:${seconds}`
}
const checkTime = (i) => {
    if (i < 10) {i = "0" + i};
        return i;
}

export const cutText = (text) => {
    if (text.length > 12) {
        return text.substring(0, 12) + '...';
    }
    return text;
}

export const CutAndGlueText = (props) => {
    const [long, setLong] = useState(true);
    const handleCont = () => {
        setLong(long ? false : true);
    }
    let theText = props.text;
    if (theText.length > 12) {
        theText = long ? props.text.substring(0, 12) : props.text;
    }
    return (
            <span>
                {theText}
                {props.text.length > 12 ? 
                    <a href="#" className="link-a" onClick={handleCont}>{long ? '...' : ' <'}</a> : ''
                }
            </span>
        );
}

export const makeHash = String.prototype.hashCode = (text) => {
    var hash = 0, i, chr;
    if (text.length === 0) return hash;
    for (i = 0; i < text.length; i++) {
        chr   = text.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
};
