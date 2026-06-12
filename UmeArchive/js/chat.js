async function loadMessages()
{
    const response =
        await fetch("data/messages.json");

    const messages =
        await response.json();

    const chatArea =
        document.getElementById("chatArea");

    messages.forEach(message =>
    {
        const wrapper =
            document.createElement("div");

        wrapper.className = "message";

        let content = "";

        if(message.type === "image")
        {
            content =
            `
            <img
                src="${message.image}"
                class="talk-image"
                onclick="openImage('${message.image}')">

            <p>
                ${convertUrlToLink(message.text).replace(/\n/g,"<br>")}
            </p>
            `;
        }

        if(message.type === "text")
        {
            content =
            `
            <p>
                ${convertUrlToLink(message.text).replace(/\n/g,"<br>")}
            </p>
            `;
        }

        if(message.type === "video")
        {
            content =
            `
            <video
                class="talk-video"
                controls>

                <source
                    src="${message.video}"
                    type="video/mp4">

            </video>
            `;
        }

        wrapper.innerHTML =
        `
        <div class="message-header">

            <img
                src="images/ume_icon.jpg"
                class="mini-icon">

            <span class="member-name">
                梅澤美波
            </span>

            <span class="message-date">
                ${message.date}
            </span>

        </div>

        <div class="message-box">
            ${content}
        </div>
        `;

        chatArea.appendChild(wrapper);
    });
}

function openImage(src)
{
    document.getElementById("imageModal")
        .style.display = "flex";

    document.getElementById("modalImage")
        .src = src;
}

function closeImage()
{
    document.getElementById("imageModal")
        .style.display = "none";
}

function convertUrlToLink(text)
{
    return text.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank">$1</a>'
    );
}

loadMessages();