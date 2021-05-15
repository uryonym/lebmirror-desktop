import { Button, ListGroup } from 'react-bootstrap'
import React from 'react'

const PagesList: React.VFC = () => (
  <div className="content-list">
    <Button variant="outline-warning" block className="mb-2">
      Add a Page
    </Button>
    <ListGroup variant="flush">
      {(() => {
        const lists = []
        for (let i = 0; i < 30; i += 1) {
          lists.push(
            <ListGroup.Item
              key={i}
              action
              onClick={() => console.log('page link is clicked.')}
              className="list-item"
            >
              page name
            </ListGroup.Item>
          )
        }
        return lists
      })()}
    </ListGroup>
  </div>
)

export default PagesList
