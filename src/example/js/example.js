import config from '../config';
import NBClient from '../../lib/NBCClient';

const parameterProType = {
    list:{
        list: {
            label: 'Type',
            type: 'select',
            options: ['country','destination','city','provider','catalog','language','geocode','address','climate']
        },
        lc: {
            label: 'Country code',
            type: 'text'
        },
        zi: {
            label: 'Destination id',
            type: 'text'
        },
        si: {
            label: 'City Id',
            type: 'text'
        },
        lang: {
            label: 'Language',
            type: 'select',
            options: [{
                value: 'de',
                label: 'German',
            },
                {
                    value: 'en',
                    label: 'English'
                },
                {
                    value: 'fr',
                    label: 'French'
                },
                {
                    value: 'es',
                    label: 'Spanish'
                },
                {
                    value: 'it',
                    label: 'Italian'
                }
            ],
        }
    },
    hotel: {
        gid: {
            label: 'GiataId',
            type: 'text'
        },
        oc: {
            label: 'Booking Code',
            type: 'text'
        },
        vc: {
            label: 'Touroperator code',
            type: 'text'
        },
        date: {
            label: 'Date',
            type: 'date'
        },
        lang: {
            label: 'Language',
            type: 'select',
            options: [{
                    value: 'de',
                    label: 'German',
                },
                {
                    value: 'en',
                    label: 'English'
                },
                {
                    value: 'fr',
                    label: 'French'
                },
                {
                    value: 'es',
                    label: 'Spanish'
                },
                {
                    value: 'it',
                    label: 'Italian'
                }
            ],
        }
    },
    search:{
        hn: {
            label: 'Hotel name',
            type: 'text'
        },
        lc: {
            label: 'Country code',
            type: 'text'
        },
        zn: {
            label: 'Destination name',
            type: 'text'
        },
        sn: {
            label: 'City name',
            type: 'text'
        }
    }
};
$.extend(parameterProType.search, parameterProType.hotel);

class ExampleApp {
    constructor() {
        this.client = new NBClient(config.apiUrl);
        this.formCt = $('#content-search');
        this.formCt.on('submit', this.onSubmit.bind(this));
        this.formCt.on('change', this.onChange.bind(this));
        this.formEl = $('#dynamicform');
        this.responseCt = $('#response');
        this.requesttype = $('#requesttype');
        this.requesttype.on('change', this.onRequesttypeChange.bind(this));
        this.values = {
            list: 'country',
            lang: 'de'
        };
        this.renderFields();
    }
    renderFields() {
        this.formEl.empty();
        let activeRow = $('<div class="row" />');
        let me = this;
        const parameters = parameterProType[this.requesttype.val()];
        Object.keys(parameters).forEach((key, index) => {
            let activeCell = $('<div class="form-group col-md-3" />');
            activeCell.appendTo(activeRow);
            activeCell.append('<label>' + parameters[key].label + '</label>');
            switch (parameters[key].type) {
                case 'text':
                    activeCell.append('<input type="text" class="form-control" name="' + key + '" value="' + (me.values[key] ? me.values[key] : '') + '" />');
                    break;
                case 'date':
                    activeCell.append('<input type="date" class="form-control" name="' + key + '" value="' + (me.values[key] ? me.values[key] : '') + '" />');
                    break;
                case 'select':
                    let select = $('<select name="' + key + '" class="form-control">');
                    let options = parameters[key].options[0] instanceof Object
                        ? parameters[key].options
                        : parameters[key].options.map(option => ({ value: option, label: option }));
                    options.forEach(option => {
                        $('<option value="' + option.value + '">' + option.label + '</option>').appendTo(select);
                    });
                    activeCell.append(select);
                    break;
            }

            if ((index + 1) % 4 === 0) {
                activeRow.appendTo(this.formEl);
                activeRow = $('<div class="row" />');
                activeRow.classList = 'row';
            }
        });
        activeRow.appendTo(this.formEl);
    }

    renderResponse(response) {
        const items = response instanceof Array ? response : response.items;
        this.responseCt.empty();
        let table = $('<table />');
        items.forEach((element, index) => {
            let row = $('<tr />');
            if (index === 0) {
                Object.keys(element).forEach(key => {
                    row.append('<th>' + key + '</th>');
                });
                row.appendTo(table);
                row = $('<tr />');
            }
            Object.values(element).forEach(value => {
                row.append('<td>' + value + '</td>');
            });
            row.appendTo(table);
        });
        table.appendTo(this.responseCt);
    }

    onRequesttypeChange(e) {
        this.renderFields();
    }

    onChange(e) {
        let el = $(e.target);
        this.values[el.attr('name')] = el.val();
        console.log(this.values);
    }

    onSubmit(e) {
        e.preventDefault();
        let form = $(e.target);
        let values = Object.assign({}, this.values);
        delete values['requesttype'];
        Object.keys(values).forEach(key => {
            if (values[key].length === 0 || values[key] === undefined) {
                delete values[key];
            }
        });
        switch (this.requesttype.val()) {
            case 'list':
                this.client.requestList(values).then(this.renderResponse.bind(this));
                break;
            case 'search':
                this.client.requestSearch(values).then(this.renderResponse.bind(this));
                break;
            case 'hotel':
                this.client.requestHotel(values).then(this.renderResponse.bind(this));
                break;
        }

        return false;
    }
}

//document.addEventListener('DOMContentLoader', () => {
    const exampleApp = new ExampleApp();
//});