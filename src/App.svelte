<script>
	import { landContract, plantContract } from "./lib/readData.js";
	// const Web3 = require('web3');
	import { addresses } from "./lib/data.js";
	import { Form, FormGroup, Input, Card , Button, Table, Container, Col, Row } from "sveltestrap";

	function toggleClass(el, className) {
		if (el.class.indexOf(className) > 0) {
			el.className = el.className.replace(className, "");
		} else {
			el.className += className;
		}
	}

	async function getTotalPlant(address) {
		return await plantContract.methods
			.balanceOf(address)
			.call()
			.then((res) => {
				return res;
			});
	}

	
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/@tabler/core@1.0.0-beta3/dist/css/tabler.min.css"
		crossorigin="anonymous"
	/>
</svelte:head>

<Container>
	<Row>
		<Col>
			<Card body>
				<Row class="sticky-top">
					<Col>
						<Form>
							<FormGroup>
								<Input value="" placeholder="Start Filter"/>
							</FormGroup>
						</Form>
					</Col>
					<Col>
						<Form>
							<FormGroup>
								<Input value="" placeholder="End Filter"/>
							</FormGroup>
						</Form>
					</Col>
				</Row>
				<Row>
				<Table responsive hover size="md" >
					<thead>
						<tr class="tableHeader">
							<th><h1>#</h1></th>
							<th><h1>Coord</h1></th>
							<th><h1>Address</h1></th>
							<th><h1>Plant</h1></th>
						</tr>
					</thead>
					<tbody>
						{#each addresses as { address, coordinate }, i}
							<tr>
								<th scope="row">{i + 1}</th>
								<td><h3><Button class="clip" outline data-clipboard-text={coordinate}>📋</Button>{coordinate}</h3></td>
								<td>
									<h3><Button class="clip" outline data-clipboard-text="https://marketplace.plantvsundead.com/farm/other/{address}">📋</Button>
									<a class="blue" href="https://marketplace.plantvsundead.com/farm/other/{address}" target="_blank">{address.substring(0,15)}...</a></h3>
								</td>
								{#await getTotalPlant(address)}
									<td><h3>...</h3></td>
								{:then res}
									<td	td><h3>{res}🌱</h3></td>
								{/await}
							</tr>
						{/each}
					</tbody>
				</Table>
				</Row>
			</Card>
		</Col>
	</Row>
</Container>

<style>
	.onClicked  		   { background-color: pink; }
	.notClicked 		   { background-color: none; }
</style>
