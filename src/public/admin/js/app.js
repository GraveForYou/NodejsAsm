$(document).ready(function() {

    $(document).on('click', '#show-modal-qv', function() {
        var dataId = $(this).attr("data-id");
        $.ajax({
            url: '/products',
            method: 'POST',
            dataType: 'json',
            data: { id: dataId },
            success: function(product) {
                $('.img-modal').attr('src', `${product.image[0]}`)
                $('.img-modal').attr('data-thumb', `${product.image[0]}`)
                $('#product-name').text(product.name)
                $('#product-price').text('$' + product.price)
                $('#product-desc').text(product.description)
                for (var i = 0; i < product.size.length; i++) {
                    var s = `<option>Size ${product.size[i]}</option>`
                    $('#product-size').append(s)
                }
                for (var i = 0; i < product.color.length; i++) {
                    var c = `<option>${product.color[i]}</option>`
                    $('#product-color').append(c)
                }
            },
            error: function(response) {
                alert('server error')
            }
        });
    });

});

// const m = document.querySelector.bind(document)
// const mm = document.querySelectorAll.bind(document)

// const selectElement = m('.chosenselect')
// const selectOptions = mm('.chosenselect option')
// const select = m('#select')
// m('#select').onclick = () => {



//     if (selectElement.classList.contains('d-block')) {
//         selectElement.classList.remove('d-block');
//     } else {
//         selectElement.classList.add('d-block');
//     }
// }

// const handlegetValueSelect = function() {

//         var new_arr = [];
//         var values = [];
//         selectOptions.forEach(option => {
//             option.onclick = () => {



//                 if (option.getAttribute('selected') == 'true') {
//                     option.removeAttribute('selected');
//                     const valueToRemove = option.value;
//                     new_arr = values.filter(item => item !== valueToRemove);
//                     values = new_arr;
//                     option.style.color = 'black'
//                 } else {
//                     var valueoption = option.value
//                     option.setAttribute('selected', true);
//                     values.push(valueoption);
//                     option.style.color = '#ccc'
//                 }
//                 var selected = mm('option[selected="true"]')
//                 select.innerHTML += ""
//                 if (selected.length < 1) {
//                     select.innerHTML = 'select'
//                 }
//                 selected.forEach((function(sel) {
//                     if (sel) {
//                         select.innerHTML = values.join(', ')
//                     } else {
//                         select.innerHTML = values.join(', ')
//                     }
//                 }))
//                 console.log(values)
//             };
//         });
//         // $(document).on('click', '#submitCreateForm', function() {
//         //     console.log('values', values)
//         //     $.ajax({
//         //         url: '/admin/create',
//         //         method: 'POST',
//         //         dataType: 'json',
//         //         data: { data: values },
//         //         success: function(data) {
//         //             alert('Success', data)
//         //         },
//         //         error: function(response) {
//         //             alert('server error')
//         //         }
//         //     });
//         // });
//     }
//     // handlegetValueSelect()