import "@nomiclabs/hardhat-ethers"; // Uses the hardhat-ethers plugin to use Ethers
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Hero", function() {
    async function createHero() {
        const Hero = await ethers.getContractFactory("TestHero");
        const hero = await Hero.deploy();
        await hero.deployed();

        return hero;
    }

    let hero;

    before(async function() {
        hero = await createHero();
    });

    it ("should get a zero hero array", async function() {
        const heroes = await hero.getHeroes();
        expect(heroes.length).to.equal(0);
    });

    it("should fail at creating hero cause of payment", async function() {
        let e;

        try {
            await hero.createHero( 0, {
                value: ethers.utils.parseEther("0.0499999")
            });
        } catch (err) {
            e = err;
        }

        expect(e.message.includes("Insufficient funds")).to.equal(true);
    });

    it("should create a hero with random values", async function() {
        const hero = await createHero();

        await hero.setRandom(69);
        await hero.createHero(0, {
            value: ethers.utils.parseEther("0.05")
        });

        const h = (await hero.getHeroes())[0];

        // [ S , H , D, I , M ]
        // [ S , H , D, I ]
        // [ S , I , D ]
        expect(await hero.getMagic(h)).to.equal(16);
        expect(await hero.getHealth(h)).to.equal(2);
    });
});
