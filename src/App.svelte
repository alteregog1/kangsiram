<script>
	import { landContract, plantContract } from "./lib/readData.js";
	import { Form, FormGroup, Input, Card , Button, Table, Container, Col, Row } from "sveltestrap";
	import {onMount} from "svelte"

	let currentRow;

	const fetchAddress = (async () => {
		const response = await fetch(API)
    	return await response.json()
	})()


	async function getTotalPlant(address) {
		return await plantContract.methods
			.balanceOf(address)
			.call()
			.then((res) => {
				return res;
			});
	}
	
	let startRowFilter
	let endRowFilter

	function highlightRow(row){
		document.getElementById(row).classList.add("highlight")
		console.log(document.getElementById(row))
	}
	
	function filter(){
		let rows = document.getElementsByTagName("tr")

		for (var i=1, max=rows.length; i < max; i++) {
			let rowNumber = parseInt(rows[i].children[0].innerText)
			if(rowNumber < startRowFilter){
				rows[i].style.display = "none"
			}else if(rowNumber > endRowFilter){
				rows[i].style.display = "none"
			}else{
				
				rows[i].style.removeProperty("display")
			}
			
		}
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
								<Input on:change="{filter}" bind:value="{startRowFilter}" placeholder="Start Dari"/>
							</FormGroup>
						</Form>
					</Col>
					<Col>
						<Form>
							<FormGroup>
								<Input  on:change="{filter}" bind:value="{endRowFilter}"  placeholder="Sampai"/>
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
						{#await fetchAddress}
						<p>...waiting</p>
						{:then datas}
							{#each datas as { address, coordinate }, i}
								<tr id="row-{i+1}">
									<th scope="row">{i + 1}</th>
									<td><h3><Button class="clip" outline data-clipboard-text={coordinate}>📋</Button>{coordinate}</h3></td>
									<td>
										<h3><Button class="clip" outline data-clipboard-text="https://marketplace.plantvsundead.com/farm/other/{address}">📋</Button>
										<a on:click="{() => highlightRow("row-"+(i+1))}" class="blue" href="https://marketplace.plantvsundead.com/farm/other/{address}" target="_blank">{address.substring(0,15)}...</a></h3>
									</td>
									{#await getTotalPlant(address)}
										<td><h3>...</h3></td>
									{:then res}
										<td	td><h3>{res}🌱</h3></td>
									{/await}
								</tr>
							{/each}
						{:catch error}
						<p>Error Pak!</p>
						{/await}
						
					</tbody>
				</Table>
				</Row>
			</Card>
		</Col>
	</Row>
</Container>

