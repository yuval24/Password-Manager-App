import {React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';


const PasswordManager = () => {
    let navigate = useNavigate();
    const [vaultsList, setVaultsList] = useState([]);
    const [showPasswords, setShowPasswords] = useState(false);

    useEffect(() => {
        getVaults();
    }, []);

    const moveToGeneratePassword = () => {
        navigate("/password-manager/generate-password");
    };

    async function getVaults() {
        const response = await fetch('http://localhost:3001/passwords/vaults', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        console.log(data);
        setVaultsList(data);
    }

    async function deleteVault(id) {
        const response = await fetch(`http://localhost:3001/passwords/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        if (data.success) {
            getVaults();
        } else {
            alert(data.msg);
        }
    }


    function copyToClipboard(text) {
        var dummy = document.createElement("textarea");
        // to avoid breaking orgain page when copying more words
        // cant copy when adding below this code
        // dummy.style.display = 'none'
        document.body.appendChild(dummy);
        //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    return (
        <div>
            <button onClick={moveToGeneratePassword}>Generate Password</button>
            <h1>Here are the Vaults!</h1>
            <div className='homePage'>
                {vaultsList.map((vault) => (
                    <div className='post' key={vault.id}>
                        <div className='postHeader'>
                            <div className='title'>
                                <h1>{vault.title}</h1>
                            </div>
                            <div className='deletePost'>
                                <button
                                    onClick={() => {
                                        deleteVault(vault._id)
                                    }}
                                >
                                    &#128465;
                                </button>
                            </div>
                        </div>
                        <div className='postTextContainer'>
                            Password:{" "}
                            <input
                                type={showPasswords ? "text" : "password"}
                                value={vault.password}
                                disabled
                            />
                            <button onClick={() => setShowPasswords((prev) => !prev)}>
                                {showPasswords ? "Hide Password" : "Show Password"}
                            </button>
                            <button onClick={() => copyToClipboard(vault.password)}>
                                Copy
                            </button>
                        </div>
                        <h3>username: {vault.username}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PasswordManager;