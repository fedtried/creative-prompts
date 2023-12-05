import { Card } from 'semantic-ui-react'

const Prompt = (props: { date: string; quote: string}) => {

  return (
    <Card fluid>
        <Card.Content>
            <Card.Meta>{props.date}</Card.Meta>
            <Card.Header>{props.quote}</Card.Header>
        </Card.Content>
    </Card>
  )
}

export default Prompt