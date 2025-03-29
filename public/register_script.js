
const res = await fetch('/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': token 
    },
    body: JSON.stringify(formData)
});

let data;
const contentType = res.headers.get("content-type");

if (contentType && contentType.includes("application/json")) {
    data = await res.json();
} else {
    const text = await res.text();
    console.warn('Received non-JSON response:', text);
    alert('Server responded with an HTML error. Please check the form or try again.');
    return;
}

if (!res.ok) {
    if (data.errors) {
        data.errors.forEach(error => {
            alert(`${error.path}: ${error.msg}`);
        });
    } else {
        alert(data.message || 'Unknown error');
    }
} else {
    alert(data.message); // success message
}
