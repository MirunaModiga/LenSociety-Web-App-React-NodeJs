import React from "react"
import './Join.css'
import { useSelector } from "react-redux"

const Join = () => {
    const { currentUser } = useSelector(state => state.user);

    if (currentUser && currentUser.usertype !== 'contributor') {
        return null;
    }

    const handleSubscribe = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/user/subscribe/${currentUser._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isSubscribed: true }),
                credentials: 'include',
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            alert('Subscribed successfully');
        } catch (error) {
            console.error('Error subscribing:', error);
        }
    };

    const Newsletter = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '60px' }}>
                <form
                    className="text-neutral-800 py-6 relative overflow-hidden flex flex-col justify-around w-96 h-44 border border-neutral-500 rounded-lg bg-neutral-50 p-3 px-6">
                    <div
                        className="before:absolute before:w-32 before:h-20 before:right-2 before:bg-rose-300 before:-z-10 before:rounded-full before:blur-xl before:-top-12 z-10 after:absolute after:w-24 after:h-24 after:bg-purple-300 after:-z-10 after:rounded-full after:blur after:-top-12 after:-right-6">
                        <span className="font-extrabold text-2xl text-violet-600">Get more updates...</span>
                        <p className="text-neutral-700">
                            Sign up for our newsletter and you'll find out about your downloads
                        </p>
                    </div>
                    <div className="flex gap-1">
                        <div
                            className="relative rounded-lg w-64 overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg">
                            <input required
                                type="email"
                                className="relative bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500"
                                value={currentUser.email} placeholder="Enter your email"
                            />
                        </div>
                        <button onClick={() => handleSubscribe()}
                            className="bg-violet-500 text-neutral-50 p-2 rounded-lg hover:bg-violet-400">
                            Subscribe
                        </button>
                    </div>
                </form>

            </div>
        );
    }

    if (currentUser && currentUser.usertype === 'contributor') {
        return <Newsletter />;
    }

    return (
        <section className="join-wrapper">
            <h1 className="join-text">Join our community today</h1>
            <div className="vertical-paddings-s"></div>
            <p className="j-paragraph">
                Do you love photography? Want to constantly stay inspired and be surrounded by millions of like-minded creators?
                Then sign-up today and get rewarded for your love of photography.
            </p>
            <div className="vertical-paddings-m"></div>
            <div><button className="pushable">
                <span className="front">
                    <a href="/signup">Sign Up</a>
                </span>
            </button></div>
        </section>
    )
}

export default Join;