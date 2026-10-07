function Footer({
    variant = "standard"
}) {

    if (variant === "admin") {

        return (

            <footer
                style={{
                    marginTop: "40px",
                    padding: "25px",
                    textAlign: "center",
                    color: "#33261E",
                    background: "#F7EFE0",
                    borderTop: "3px solid #33261E"
                }}
            >

                <p>
                    © 2026 EduBloom | Administrator Panel
                </p>

            </footer>

        );

    }


    if (variant === "learn") {

        return (

            <footer>

                <p>
                    © 2026 EduBloom | Learn • Practice • Grow
                </p>

            </footer>

        );

    }


    return (

        <footer>

            <p>
                © 2026 EduBloom
            </p>

        </footer>

    );

}


export default Footer;